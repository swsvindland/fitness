import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const storeRouter = createTRPCRouter({
    getWorkouts: protectedProcedure
        .input(z.object({ type: z.string() }))
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            return await ctx.prisma.workout.findMany({
                where: {
                    UserId: null,
                    Type: input.type,
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

    getCustomWorkouts: protectedProcedure
        .input(z.object({ type: z.string() }))
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            return await ctx.prisma.workout.findMany({
                where: {
                    UserId: ctx.auth.userId,
                    Type: input.type,
                },
                orderBy: {
                    Id: 'asc',
                },
            });
        }),

    buyWorkout: protectedProcedure
        .input(z.object({ workoutId: z.number(), type: z.string() }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            // check if same workout type
            const workouts = await ctx.prisma.userWorkout.findMany({
                where: {
                    UserId: ctx.auth.userId,
                    Workout: {
                        Type: input.type,
                    },
                    Active: true,
                },
            });

            // Turn off any active workouts
            for (const workout of workouts) {
                await ctx.prisma.userWorkout.updateMany({
                    where: {
                        Id: workout.Id,
                    },
                    data: {
                        Active: false,
                    },
                });
            }

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
