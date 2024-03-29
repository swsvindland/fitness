import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const progressPhotosRouter = createTRPCRouter({
    uploadProgressPhotos: protectedProcedure
        .input(
            z.object({
                photos: z.array(z.string()),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            for (const photo of input.photos) {
                await ctx.prisma.progressPhoto.create({
                    data: {
                        UserId: ctx.auth.userId,
                        FileId: photo,
                        Filename: `${photo}.jpg`,
                        Created: new Date(),
                    },
                });
            }
        }),

    getProgressPhotos: protectedProcedure.query(async ({ ctx }) => {
        if (!ctx.auth.userId) throw new Error('No user ID');

        return await ctx.prisma.progressPhoto.findMany({
            where: {
                UserId: ctx.auth.userId,
            },
            orderBy: {
                Created: 'asc',
            },
        });
    }),

    deleteProgressPhoto: protectedProcedure
        .input(
            z.object({
                photoId: z.bigint(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (!ctx.auth.userId) throw new Error('No user ID');

            await ctx.prisma.progressPhoto.delete({
                where: {
                    Id: input.photoId,
                },
            });
        }),
});
