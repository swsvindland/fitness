import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const storeRouter = createTRPCRouter({
    getResistanceWorkouts: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.workout.findMany({
            where: {
                UserId: null,
            },
            orderBy: {
                Id: 'asc',
            },
        });
    }),

    getWorkout: protectedProcedure
        .input(z.object({ workoutId: z.number() }))
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            return await ctx.prisma.workout.findFirst({
                where: {
                    Id: input.workoutId,
                },
            });
        }),

    getCustomWorkouts: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.workout.findMany({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Id: 'asc',
            },
        });
    }),

    buyWorkout: protectedProcedure
        .input(z.object({ workoutId: z.number() }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            // Turn off any active workouts
            await ctx.prisma.userWorkout.updateMany({
                where: {
                    UserId: ctx.auth.userId,
                    Active: true,
                },
                data: {
                    Active: false,
                },
            });

            const activeWorkout = await ctx.prisma.userWorkout.findFirst({
                where: {
                    UserId: ctx.auth.userId,
                    WorkoutId: input.workoutId,
                },
            });

            // Buy the workout, or turn on the workout if already bought
            if (activeWorkout?.Id) {
                await ctx.prisma.userWorkout.update({
                    where: {
                        Id: activeWorkout.Id,
                    },
                    data: {
                        Active: true,
                    },
                });
            } else {
                await ctx.prisma.userWorkout.create({
                    data: {
                        UserId: ctx.auth.userId,
                        WorkoutId: input.workoutId,
                        Active: true,
                        Created: new Date(),
                    },
                });
            }

            return true;
        }),
});
