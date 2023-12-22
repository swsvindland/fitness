import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const customMacrosRouter = createTRPCRouter({
    getCustomMacros: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.userCustomMacros.findMany({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });
    }),

    createCustomMacros: protectedProcedure
        .input(
            z.object({
                calories: z.number(),
                protein: z.number(),
                carbs: z.number(),
                fat: z.number(),
                fiber: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            await ctx.prisma.userCustomMacros.create({
                data: {
                    UserId: ctx.auth.userId,
                    Calories: input.calories,
                    Protein: input.protein,
                    Carbs: input.carbs,
                    Fat: input.fat,
                    Fiber: input.fiber,
                    Created: new Date(),
                },
            });
        }),

    updateCustomMacros: protectedProcedure
        .input(
            z.object({
                id: z.bigint(),
                calories: z.number(),
                protein: z.number(),
                carbs: z.number(),
                fat: z.number(),
                fiber: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            await ctx.prisma.userCustomMacros.update({
                where: {
                    Id: input.id,
                },
                data: {
                    Calories: input.calories,
                    Protein: input.protein,
                    Carbs: input.carbs,
                    Fat: input.fat,
                    Fiber: input.fiber,
                },
            });
        }),

    deleteCustomMacros: protectedProcedure
        .input(
            z.object({
                id: z.bigint(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            await ctx.prisma.userCustomMacros.delete({
                where: {
                    Id: input.id,
                },
            });
        }),
});
