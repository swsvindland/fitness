import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const bodyRouter = createTRPCRouter({
    getHeight: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.userHeight.findFirst({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });
    }),

    getAllHeights: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.userHeight.findMany({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });
    }),

    addHeight: protectedProcedure
        .input(z.object({ height: z.number() }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            await ctx.prisma.userHeight.create({
                data: {
                    UserId: ctx.auth.userId,
                    Height: input.height,
                    Created: new Date(),
                },
            });
        }),

    updateHeight: protectedProcedure
        .input(z.object({ id: z.number(), height: z.number() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userHeight.update({
                where: {
                    Id: input.id,
                },
                data: {
                    Height: input.height,
                },
            });
        }),

    deleteHeight: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userHeight.delete({
                where: {
                    Id: input.id,
                },
            });
        }),

    getWeight: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.userWeight.findFirst({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });
    }),

    getAllWeights: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.userWeight.findMany({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });
    }),

    addWeight: protectedProcedure
        .input(z.object({ weight: z.number() }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            await ctx.prisma.userWeight.create({
                data: {
                    UserId: ctx.auth.userId,
                    Weight: input.weight,
                    Created: new Date(),
                },
            });
        }),

    updateWeight: protectedProcedure
        .input(z.object({ id: z.number(), weight: z.number() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userWeight.update({
                where: {
                    Id: input.id,
                },
                data: {
                    Weight: input.weight,
                },
            });
        }),

    deleteWeight: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userWeight.delete({
                where: {
                    Id: input.id,
                },
            });
        }),

    getBloodPressure: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.userBloodPressure.findFirst({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });
    }),

    getAllBloodPressures: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.userBloodPressure.findMany({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });
    }),

    addBloodPressure: protectedProcedure
        .input(z.object({ systolic: z.number(), diastolic: z.number() }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            await ctx.prisma.userBloodPressure.create({
                data: {
                    UserId: ctx.auth.userId,
                    Systolic: input.systolic,
                    Diastolic: input.diastolic,
                    Created: new Date(),
                },
            });
        }),

    updateBloodPressure: protectedProcedure
        .input(
            z.object({
                id: z.number(),
                systolic: z.number(),
                diastolic: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userBloodPressure.update({
                where: {
                    Id: input.id,
                },
                data: {
                    Systolic: input.systolic,
                    Diastolic: input.diastolic,
                },
            });
        }),

    deleteBloodPressure: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userBloodPressure.delete({
                where: {
                    Id: input.id,
                },
            });
        }),

    getBody: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.userBody.findFirst({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });
    }),

    getAllBodies: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.userBody.findMany({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });
    }),

    addBody: protectedProcedure
        .input(
            z.object({
                neck: z.number(),
                shoulders: z.number(),
                chest: z.number(),
                leftBicep: z.number(),
                rightBicep: z.number(),
                navel: z.number(),
                waist: z.number(),
                hip: z.number(),
                leftThigh: z.number(),
                rightThigh: z.number(),
                leftCalf: z.number(),
                rightCalf: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            await ctx.prisma.userBody.create({
                data: {
                    UserId: ctx.auth.userId,
                    Neck: input.neck,
                    Shoulders: input.shoulders,
                    Chest: input.chest,
                    LeftBicep: input.leftBicep,
                    RightBicep: input.rightBicep,
                    Navel: input.navel,
                    Waist: input.waist,
                    Hip: input.hip,
                    LeftThigh: input.leftThigh,
                    RightThigh: input.rightThigh,
                    LeftCalf: input.leftCalf,
                    RightCalf: input.rightCalf,
                    Created: new Date(),
                },
            });
        }),

    updateBody: protectedProcedure
        .input(
            z.object({
                id: z.number(),
                neck: z.number(),
                shoulders: z.number(),
                chest: z.number(),
                leftBicep: z.number(),
                rightBicep: z.number(),
                navel: z.number(),
                waist: z.number(),
                hip: z.number(),
                leftThigh: z.number(),
                rightThigh: z.number(),
                leftCalf: z.number(),
                rightCalf: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userBody.update({
                where: {
                    Id: input.id,
                },
                data: {
                    Neck: input.neck,
                    Shoulders: input.shoulders,
                    Chest: input.chest,
                    LeftBicep: input.leftBicep,
                    RightBicep: input.rightBicep,
                    Navel: input.navel,
                    Waist: input.waist,
                    Hip: input.hip,
                    LeftThigh: input.leftThigh,
                    RightThigh: input.rightThigh,
                    LeftCalf: input.leftCalf,
                    RightCalf: input.rightCalf,
                },
            });
        }),

    deleteBody: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userBody.delete({
                where: {
                    Id: input.id,
                },
            });
        }),

    getAllBodyFats: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return [{ created: '2021-01-01', bodyFat: 20 }];
    }),
});
