import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';
import axios from 'axios';
import { FoodSearch } from '../types/foodSearch';

const authFatSecret = async (): Promise<string> => {
    const response = await axios({
        method: 'POST',
        url: 'https://oauth.fatsecret.com/connect/token',
        auth: {
            username: process.env.FAT_SECRET_KEY,
            password: process.env.FAT_SECRET_SECRET,
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: 'grant_type=client_credentials&scope=basic premier barcode',
    });

    return response.data.access_token;
};

export const foodRouter = createTRPCRouter({
    autocomplete: protectedProcedure
        .input(z.object({ query: z.string() }))
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');
            if (input.query.length < 3) return [];

            const auth = await authFatSecret();

            const response = await axios.get(
                `https://platform.fatsecret.com/rest/server.api?method=foods.autocomplete.v2&expression=${input.query}&format=json`,
                { headers: { Authorization: `Bearer ${auth}` } }
            );

            return (response.data?.suggestions?.suggestion ?? []) as string[];
        }),

    searchFood: protectedProcedure
        .input(z.object({ query: z.string().nullable() }))
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');
            if (!input.query) return [];

            const auth = await authFatSecret();

            const response = await axios.get(
                `https://platform.fatsecret.com/rest/server.api?method=foods.search.v2&search_expression=${input.query}&format=json`,
                { headers: { Authorization: `Bearer ${auth}` } }
            );

            return (response.data?.foods_search?.results.food ??
                []) as FoodSearch[];
        }),

    getRecentUserFoods: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return ctx.prisma.userFoodV2.findMany({
            where: { UserId: ctx.auth.userId },
            orderBy: { Created: 'desc' },
            include: { FoodV2: true, FoodV2Serving: true },
        });
    }),
});
