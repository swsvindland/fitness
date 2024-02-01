import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';

export const supplementsRouter = createTRPCRouter({
    getAllSupplements: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.supplements.findMany();
    }),

    getUserSupplements: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.userSupplements.findMany({
            where: {
                UserId: ctx.auth.userId,
            },
            include: {
                Supplement: true,
            },
        });
    }),

    getUserSupplementActivity: protectedProcedure
        .input(
            z.object({
                supplementId: z.number(),
                userSupplementId: z.number().nullable(),
                time: z.string().nullable(),
                date: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');
            if (input.time == null) return null;
            if (input.userSupplementId == null) return null;

            const today = new Date(input.date);

            return await ctx.prisma.userSupplementActivity.findFirst({
                where: {
                    UserId: ctx.auth.userId,
                    UserSupplementId: input.userSupplementId,
                    Time: input.time,
                    Updated: {
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
            });
        }),

    toggleUserSupplementActivity: protectedProcedure
        .input(
            z.object({
                date: z.string(),
                userSupplementId: z.number(),
                time: z.string().nullable(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            const today = new Date(input.date);

            const activity = await ctx.prisma.userSupplementActivity.findFirst({
                where: {
                    UserId: ctx.auth.userId,
                    UserSupplementId: input.userSupplementId,
                    Time: input.time,
                    Updated: {
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
            });

            if (activity) {
                await ctx.prisma.userSupplementActivity.delete({
                    where: {
                        Id: activity.Id,
                    },
                });
            } else {
                await ctx.prisma.userSupplementActivity.create({
                    data: {
                        UserId: ctx.auth.userId,
                        UserSupplementId: input.userSupplementId,
                        Time: input.time,
                        Updated: input.date,
                    },
                });
            }
        }),

    upsertUserSupplement: protectedProcedure
        .input(
            z.object({
                id: z.number(),
                supplementId: z.number(),
                times: z.array(z.string()),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            await ctx.prisma.userSupplements.upsert({
                where: {
                    Id: input.id,
                },
                update: {
                    Times: input.times.join(','),
                },
                create: {
                    UserId: ctx.auth.userId,
                    SupplementId: input.supplementId,
                    Times: input.times.join(','),
                    Created: new Date(),
                },
            });
        }),
});
