import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const settingsRouter = createTRPCRouter({
    defaultSettings: protectedProcedure.mutation(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return ctx.prisma.userSettings.create({
            data: {
                UserId: ctx.auth.userId,
                Age: 30,
                Sex: 'Unknown',
                Units: 'Imperial',
                Created: new Date(),
                Updated: new Date(),
            },
        });
    }),

    getUserSettings: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        const settings = await ctx.prisma.userSettings.findFirst({
            where: {
                UserId: ctx.auth.userId,
            },
        });

        if (settings) return settings;

        await ctx.prisma.userSettings.create({
            data: {
                UserId: ctx.auth.userId,
                Age: 30,
                Sex: 'Unknown',
                Units: 'Imperial',
                Created: new Date(),
                Updated: new Date(),
            },
        });

        return ctx.prisma.userSettings.findFirst({
            where: {
                UserId: ctx.auth.userId,
            },
        });
    }),

    updateUserSettings: protectedProcedure
        .input(
            z.object({
                id: z.number(),
                age: z.number(),
                sex: z.string(),
                units: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.userSettings.update({
                where: {
                    Id: input.id,
                },
                data: {
                    Age: input.age,
                    Sex: input.sex,
                    Units: input.units,
                },
            });
        }),

    updateSex: protectedProcedure
        .input(z.object({ id: z.number(), sex: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userSettings.update({
                where: {
                    Id: input.id,
                },
                data: {
                    Sex: input.sex,
                },
            });
        }),

    updateUnits: protectedProcedure
        .input(z.object({ id: z.number(), units: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userSettings.update({
                where: {
                    Id: input.id,
                },
                data: {
                    Units: input.units,
                },
            });
        }),

    updateAge: protectedProcedure
        .input(z.object({ id: z.number(), age: z.number() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.userSettings.update({
                where: {
                    Id: input.id,
                },
                data: {
                    Age: input.age,
                },
            });
        }),
});
