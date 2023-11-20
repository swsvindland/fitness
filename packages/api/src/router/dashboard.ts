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
            done: addSex && addHeight && addWeight && addSupplements,
        };
    }),
});
