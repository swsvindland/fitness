import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';
import axios from 'axios';
import { FoodSearch } from '../types/foodSearch';
import { Food } from '../types/food';
import { FoodV2 } from '@fitness/types';

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

const getFoodById = async (prisma: any, foodId: number): Promise<FoodV2> => {
    const foodV2 = await prisma.foodV2.findFirst({
        where: { Id: foodId },
        include: {
            FoodV2Servings: true,
        },
    });

    if (foodV2) return foodV2;

    const auth = await authFatSecret();

    const response = await axios.get(
        `https://platform.fatsecret.com/rest/server.api?method=food.get.v2&food_id=${foodId}&format=json`,
        { headers: { Authorization: `Bearer ${auth}` } }
    );

    const fatSecretFood = response.data?.food as Food;

    await prisma.foodV2.create({
        data: {
            Id: fatSecretFood.food_id,
            Name: fatSecretFood.food_name,
            Brand: fatSecretFood.brand_name,
            FoodType: fatSecretFood.food_type,
            Created: new Date(),
            Updated: new Date(),
        },
    });

    for (const serving of fatSecretFood.servings.serving) {
        await prisma.foodV2Servings.create({
            data: {
                Id: Number(serving.serving_id),
                FoodV2Id: fatSecretFood.food_id,
                Calories: Number(serving.calories),
                Carbohydrate: Number(serving.carbohydrates),
                Fat: Number(serving.fat),
                Protein: Number(serving.protein),
                MeasurementDescription: serving.measurement_description,
                MetricServingAmount: Number(serving.metric_serving_amount),
                MetricServingUnit: serving.metric_serving_unit,
                ServingDescription: serving.serving_description,
                Created: new Date(),
                Updated: new Date(),
                AddedSugar: Number(serving.added_sugars),
                Calcium: Number(serving.calcium),
                Cholesterol: Number(serving.cholesterol),
                Fiber: Number(serving.fiber),
                Iron: Number(serving.iron),
                MonounsaturatedFat: Number(serving.monounsaturated_fat),
                NumberOfUnits: Number(serving.number_of_units),
                PolyunsaturatedFat: Number(serving.polyunsaturated_fat),
                Potassium: Number(serving.potassium),
                SaturatedFat: Number(serving.saturated_fat),
                Sodium: Number(serving.sodium),
                Sugar: Number(serving.sugar),
                TransFat: Number(serving.trans_fat),
                VitaminA: Number(serving.vitamin_a),
                VitaminC: Number(serving.vitamin_c),
                VitaminD: Number(serving.vitamin_d),
            },
        });
    }

    return prisma.foodV2.findFirst({
        where: { Id: foodId },
        include: {
            FoodV2Servings: true,
        },
    });
};

export const foodRouter = createTRPCRouter({
    autocomplete: protectedProcedure
        .input(z.object({ query: z.string() }))
        .query(async ({ input }) => {
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
        .query(async ({ input }) => {
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

    getAllUserFood: protectedProcedure
        .input(z.object({ date: z.string() }))
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');
            const today = new Date(input.date);

            return ctx.prisma.userFoodV2.findMany({
                where: {
                    UserId: ctx.auth.userId,
                    Created: {
                        gte: new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDate(),
                            0,
                            0,
                            0,
                            0
                        ),
                    },
                },
                include: { FoodV2: true, FoodV2Serving: true },
            });
        }),

    getUserFoodById: protectedProcedure
        .input(z.object({ userFoodId: z.number() }))
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            return ctx.prisma.userFoodV2.findFirst({
                where: { Id: input.userFoodId, UserId: ctx.auth.userId },
                include: { FoodV2: true, FoodV2Serving: true },
            });
        }),

    getFoodById: protectedProcedure
        .input(z.object({ foodId: z.number() }))
        .query(async ({ ctx, input }) => {
            return getFoodById(ctx.prisma, input.foodId);
        }),

    addUserFood: protectedProcedure
        .input(
            z.object({
                foodId: z.number(),
                servingId: z.number(),
                servingAmount: z.number(),
                date: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userFoodV2.create({
                data: {
                    UserId: ctx.auth.userId!,
                    FoodV2Id: input.foodId,
                    ServingId: input.servingId,
                    ServingAmount: input.servingAmount,
                    Created: new Date(input.date),
                },
            });
        }),

    updateUserFood: protectedProcedure
        .input(
            z.object({
                userFoodId: z.number(),
                servingId: z.number(),
                servingAmount: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userFoodV2.update({
                where: { Id: input.userFoodId },
                data: {
                    ServingId: input.servingId,
                    ServingAmount: input.servingAmount,
                    Updated: new Date(),
                },
            });
        }),

    deleteUserFood: protectedProcedure
        .input(z.object({ userFoodId: z.number() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userFoodV2.delete({
                where: { Id: input.userFoodId },
            });
        }),

    quickAddFood: protectedProcedure
        .input(
            z.object({
                userFoodId: z.number().nullable(),
                foodId: z.number(),
                servingAmount: z.number(),
                date: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');
            const food = await getFoodById(ctx.prisma, input.foodId);

            await ctx.prisma.userFoodV2.upsert({
                where: {
                    Id: input.userFoodId,
                },
                create: {
                    UserId: ctx.auth.userId!,
                    FoodV2Id: input.foodId,
                    ServingId: food.FoodV2Servings[0].Id,
                    ServingAmount: input.servingAmount,
                    Created: new Date(input.date),
                },
                update: {
                    ServingAmount: input.servingAmount,
                    Updated: new Date(),
                },
            });
        }),

    quickRemoveFood: protectedProcedure
        .input(
            z.object({
                foodId: z.number(),
                userFoodId: z.number().nullable(),
                servingAmount: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const food = await getFoodById(ctx.prisma, input.foodId);

            await ctx.prisma.userFoodV2.update({
                where: {
                    Id: input.userFoodId,
                },
                data: {
                    ServingAmount: input.servingAmount,
                    Updated: new Date(),
                },
            });
        }),
});
