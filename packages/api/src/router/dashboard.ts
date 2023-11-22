import { createTRPCRouter, protectedProcedure } from '../trpc';

export const dashboardRouter = createTRPCRouter({
    getTodos: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        const user = await ctx.prisma.users.findFirst({
            where: {
                Id: ctx.auth.userId,
            },
        });
        const height = await ctx.prisma.userHeight.findFirst({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });
        const weight = await ctx.prisma.userWeight.findFirst({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });
        const supplements = await ctx.prisma.userSupplements.findMany({
            where: {
                UserId: ctx.auth.userId,
            },
        });

        const addSex = user.Sex === 'Unknown';
        const addHeight = !height;
        const addWeight = !weight;
        const addSupplements = supplements.length === 0;

        return {
            addSex,
            addHeight,
            addWeight,
            addSupplements,
            done: !(addSex && addHeight && addWeight && addSupplements),
        };
    }),

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
