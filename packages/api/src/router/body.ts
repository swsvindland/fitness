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

    getAvgBloodPressure: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        const bps = await ctx.prisma.userBloodPressure.findMany({
            where: {
                UserId: ctx.auth.userId,
                Created: {
                    gte: new Date(
                        new Date().setDate(new Date().getDate() - 30)
                    ),
                },
            },
            orderBy: {
                Created: 'asc',
            },
        });

        const avgSystolic =
            bps.reduce((acc, bp) => acc + bp.Systolic, 0) / bps.length;
        const avgDiastolic =
            bps.reduce((acc, bp) => acc + bp.Diastolic, 0) / bps.length;

        if (isNaN(avgSystolic) || isNaN(avgDiastolic)) return null;

        return {
            systolic: avgSystolic,
            diastolic: avgDiastolic,
        };
    }),

    getAvgHeartRate: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        const bps = await ctx.prisma.userBloodPressure.findMany({
            where: {
                UserId: ctx.auth.userId,
                Created: {
                    gte: new Date(
                        new Date().setDate(new Date().getDate() - 30)
                    ),
                },
            },
            orderBy: {
                Created: 'asc',
            },
        });

        let heartRateSum = 0;
        let heartRateCount = 0;

        for (const bp of bps) {
            if (bp.HeartRate) {
                heartRateSum += bp.HeartRate;
                heartRateCount++;
            }
        }

        if (heartRateCount === 0) return null;

        return {
            heartRate: heartRateSum / heartRateCount,
        };
    }),

    addBloodPressure: protectedProcedure
        .input(
            z.object({
                systolic: z.number(),
                diastolic: z.number(),
                heartRate: z.number().nullable(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            await ctx.prisma.userBloodPressure.create({
                data: {
                    UserId: ctx.auth.userId,
                    Systolic: input.systolic,
                    Diastolic: input.diastolic,
                    HeartRate: input.heartRate,
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
                heartRate: z.number().nullable(),
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
                    HeartRate: input.heartRate,
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

    getAllBMI: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        const bmi: { created: Date; bmi: number }[] = [];

        const heights = await ctx.prisma.userHeight.findMany({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });

        if (heights.length === 0) return [];

        if (heights.length === 1) {
            const weights = await ctx.prisma.userWeight.findMany({
                where: {
                    UserId: ctx.auth.userId,
                },
                orderBy: {
                    Created: 'asc',
                },
            });

            if (weights.length === 0) return [];

            if (weights.length === 1) {
                bmi.push({
                    created: heights[0].Created,
                    bmi: calcBMI(weights[0].Weight, heights[0].Height),
                });
            }

            if (weights.length > 1) {
                for (let i = 1; i < weights.length; i++) {
                    bmi.push({
                        created: heights[0].Created,
                        bmi: calcBMI(weights[i].Weight, heights[0].Height),
                    });
                }
            }
        }

        if (heights.length > 1) {
            for (let i = 1; i < heights.length; i++) {
                const weights = await ctx.prisma.userWeight.findMany({
                    where: {
                        UserId: ctx.auth.userId,
                        Created: {
                            gte: heights[i].Created,
                        },
                    },
                    orderBy: {
                        Created: 'asc',
                    },
                });

                if (weights.length === 0) return [];

                if (weights.length === 1) {
                    bmi.push({
                        created: heights[i].Created,
                        bmi: calcBMI(weights[0].Weight, heights[i].Height),
                    });
                }

                if (weights.length > 1) {
                    for (let j = 1; j < weights.length; j++) {
                        bmi.push({
                            created: heights[i].Created,
                            bmi: calcBMI(weights[j].Weight, heights[i].Height),
                        });
                    }
                }
            }
        }

        return bmi;
    }),
});

const calcBMI = (weight: number, height: number) => {
    return (weight / (height * height)) * 703;
};
