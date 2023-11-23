import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const macrosRouter = createTRPCRouter({
    getMacros: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        const macros = await ctx.prisma.userCustomMacros.findFirst({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });

        if (macros) return macros;

        const weight = await ctx.prisma.userWeight.findFirst({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });

        if (!weight)
            return {
                Calories: 2000,
                CaloriesHigh: 2500,
                Protein: 120,
                ProteinHigh: 150,
                Carbs: 200,
                CarbsHigh: 300,
                Fat: 50,
                FatHigh: 70,
                Fiber: 25,
                FiberHigh: 50,
            };

        const calories = weight?.Weight * 15 * 0.95;
        const caloriesHigh = weight?.Weight * 15 * 1.05;

        const protein = weight?.Weight * 0.8;
        const proteinHigh = weight?.Weight * 1.0;

        const fat = weight?.Weight * 0.3;
        const fatHigh = weight?.Weight * 0.5;

        const carbs = (calories - protein * 4 - fatHigh * 9) / 4;
        const carbsHigh = (caloriesHigh - proteinHigh * 4 - fat * 9) / 4;

        const fiber = calories / 1000;
        const fiberHigh = caloriesHigh / 1000;

        return {
            Calories: calories,
            CaloriesHigh: caloriesHigh,
            Protein: protein,
            ProteinHigh: proteinHigh,
            Carbs: carbs,
            CarbsHigh: carbsHigh,
            Fat: fat,
            FatHigh: fatHigh,
            Fiber: fiber,
            FiberHigh: fiberHigh,
        };
    }),

    getCurrentMacros: protectedProcedure
        .input(
            z.object({
                date: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');
            const today = new Date(input.date);

            const userFoods = await ctx.prisma.userFoodV2.findMany({
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
                include: {
                    FoodV2: true,
                    FoodV2Serving: true,
                },
            });

            let calories = 0;
            let protein = 0;
            let carbs = 0;
            let fat = 0;
            let fiber = 0;

            for (const userFood of userFoods) {
                const servings = userFood.ServingAmount;

                calories += userFood.FoodV2Serving.Calories * servings;
                protein += userFood.FoodV2Serving.Protein * servings;
                carbs += userFood.FoodV2Serving.Carbohydrate * servings;
                fat += userFood.FoodV2Serving.Fat * servings;
                fiber += userFood.FoodV2Serving.Fiber * servings;
            }

            return {
                Calories: calories,
                Protein: protein,
                Carbs: carbs,
                Fat: fat,
                Fiber: fiber,
            };
        }),
});
