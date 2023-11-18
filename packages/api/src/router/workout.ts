import { createTRPCRouter, protectedProcedure } from '../trpc';

export const workoutRouter = createTRPCRouter({
    getRecommendedNextWorkout: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        const userWorkouts = await ctx.prisma.userWorkout.findMany({
            where: {
                UserId: ctx.auth.userId,
                Active: true,
            },
            orderBy: {
                Created: 'asc',
            },
        });

        const userWorkoutsCompleted = [];

        for (const workout of userWorkouts) {
            const userWorkoutCompleted =
                await ctx.prisma.userWorkoutsCompleted.findMany({
                    where: {
                        UserId: ctx.auth.userId,
                        WorkoutId: workout.WorkoutId,
                        Created: {
                            gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        },
                    },
                    orderBy: {
                        Created: 'asc',
                    },
                });

            userWorkoutsCompleted.push(userWorkoutCompleted);
        }

        if (userWorkoutsCompleted.length === 0) {
            return userWorkouts[0];
        } else if (userWorkoutsCompleted.length < userWorkouts.length) {
            return userWorkouts[
                userWorkoutsCompleted.length - userWorkouts.length
            ];
        }
        return null;
    }),
});
