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
                caloriesHigh: z.number().nullable(),
                protein: z.number(),
                carbs: z.number(),
                fat: z.number(),
                proteinHigh: z.number().nullable(),
                carbsHigh: z.number().nullable(),
                fatHigh: z.number().nullable(),
                fiber: z.number(),
                fiberHigh: z.number().nullable(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            await ctx.prisma.userCustomMacros.create({
                data: {
                    UserId: ctx.auth.userId,
                    Calories: input.calories,
                    CaloriesHigh: input.caloriesHigh,
                    Protein: input.protein,
                    Carbs: input.carbs,
                    Fat: input.fat,
                    ProteinHigh: input.proteinHigh,
                    CarbsHigh: input.carbsHigh,
                    FatHigh: input.fatHigh,
                    Fiber: input.fiber,
                    FiberHigh: input.fiberHigh,
                    Created: new Date(),
                },
            });
        }),

    updateCustomMacros: protectedProcedure
        .input(
            z.object({
                id: z.bigint(),
                calories: z.number(),
                caloriesHigh: z.number(),
                protein: z.number(),
                carbs: z.number(),
                fat: z.number(),
                proteinHigh: z.number(),
                carbsHigh: z.number(),
                fatHigh: z.number(),
                fiber: z.number(),
                fiberHigh: z.number(),
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
                    CaloriesHigh: input.caloriesHigh,
                    Protein: input.protein,
                    Carbs: input.carbs,
                    Fat: input.fat,
                    ProteinHigh: input.proteinHigh,
                    CarbsHigh: input.carbsHigh,
                    FatHigh: input.fatHigh,
                    Fiber: input.fiber,
                    FiberHigh: input.fiberHigh,
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
