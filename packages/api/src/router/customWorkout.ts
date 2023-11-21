import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const customWorkoutRouter = createTRPCRouter({
    getWorkout: protectedProcedure
        .input(
            z.object({
                workoutId: z.number(),
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

    createWorkout: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
                days: z.number(),
                duration: z.number(),
                type: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            return await ctx.prisma.workout.create({
                data: {
                    Name: input.name,
                    Description: input.description,
                    Days: input.days,
                    Duration: input.duration,
                    Type: input.type,
                    UserId: ctx.auth.userId,
                    Created: new Date(),
                },
            });
        }),

    editWorkout: protectedProcedure
        .input(
            z.object({
                type: z.string(),
                workoutId: z.number(),
                name: z.string(),
                description: z.string(),
                days: z.number(),
                duration: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            return await ctx.prisma.workout.update({
                where: {
                    Id: input.workoutId,
                },
                data: {
                    Name: input.name,
                    Description: input.description,
                    Days: input.days,
                    Duration: input.duration,
                    Type: input.type,
                },
            });
        }),

    upsertWorkoutExercise: protectedProcedure
        .input(
            z.object({
                id: z.number().nullable(),
                workoutId: z.number(),
                exerciseId: z.number(),
                day: z.number(),
                minReps: z.number().nullable(),
                maxReps: z.number().nullable(),
                order: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            if (input.id) {
                return await ctx.prisma.workoutExercise.update({
                    where: {
                        Id: input.id,
                    },
                    data: {
                        ExerciseId: input.exerciseId,
                        Day: input.day,
                        MinReps: input.minReps,
                        MaxReps: input.maxReps,
                        Order: input.order,
                        Updated: new Date(),
                    },
                });
            }

            return await ctx.prisma.workoutExercise.create({
                data: {
                    Day: input.day,
                    MinReps: input.minReps,
                    MaxReps: input.maxReps,
                    Order: input.order,
                    WorkoutId: input.workoutId,
                    ExerciseId: input.exerciseId,
                    Created: new Date(),
                },
            });
        }),

    getExercises: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.exercise.findMany();
    }),
});
