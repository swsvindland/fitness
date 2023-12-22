import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const workoutRouter = createTRPCRouter({
    getWorkout: protectedProcedure
        .input(
            z.object({
                workoutId: z.number(),
                day: z.number(),
            })
        )
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            return await ctx.prisma.workout.findFirst({
                include: {
                    WorkoutExercise: {
                        include: {
                            Exercise: true,
                        },
                    },
                },
                where: {
                    Id: input.workoutId,
                },
            });
        }),

    getActiveUserWorkouts: protectedProcedure
        .input(z.object({ type: z.string() }))
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            return await ctx.prisma.userWorkout.findMany({
                include: {
                    Workout: true,
                },
                where: {
                    UserId: ctx.auth.userId,
                    Active: true,
                    Workout: {
                        Type: input.type,
                    },
                },
                orderBy: {
                    Created: 'asc',
                },
            });
        }),

    getNextWorkout: protectedProcedure
        .input(z.object({ type: z.string() }))
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            const activeWorkout = await ctx.prisma.userWorkout.findFirst({
                include: {
                    Workout: true,
                },
                where: {
                    UserId: ctx.auth.userId,
                    Active: true,
                    Workout: {
                        Type: input.type,
                    },
                },
            });

            if (!activeWorkout) return null;

            const lastWorkout =
                await ctx.prisma.userWorkoutsCompleted.findFirst({
                    include: {
                        Workout: true,
                    },
                    where: {
                        WorkoutId: activeWorkout.WorkoutId,
                        UserId: ctx.auth.userId,
                        Workout: {
                            Type: input.type,
                        },
                    },
                    orderBy: {
                        Created: 'desc',
                    },
                });

            if (!lastWorkout) {
                return {
                    workout: activeWorkout.Workout,
                    day: 1,
                    week: 1,
                    workoutId: activeWorkout.WorkoutId,
                    workoutCompleted: false,
                };
            }

            const days = activeWorkout.Workout.Days;
            const weeks = activeWorkout.Workout.Duration;

            const nextDay =
                lastWorkout.Day + 1 > days ? 1 : lastWorkout.Day + 1;
            const nextWeek =
                lastWorkout.Day >= days
                    ? lastWorkout.Week + 1
                    : lastWorkout.Week;

            if (nextWeek > weeks) {
                return {
                    day: 0,
                    week: 0,
                    workoutId: activeWorkout.WorkoutId,
                    workoutCompleted: true,
                };
            }

            return {
                workout: activeWorkout.Workout,
                day: nextDay,
                week: nextWeek,
                workoutId: activeWorkout.WorkoutId,
                workoutCompleted: false,
            };
        }),

    getWorkoutExercise: protectedProcedure
        .input(z.object({ workoutExerciseId: z.number() }))
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            return await ctx.prisma.workoutExercise.findFirst({
                where: {
                    Id: input.workoutExerciseId,
                },
                include: {
                    Exercise: true,
                },
            });
        }),
});
