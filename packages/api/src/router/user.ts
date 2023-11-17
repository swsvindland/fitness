import { v4 as uuidv4 } from 'uuid';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
    getUser: protectedProcedure.query(async ({ ctx }) => {
        // return user who has authed with clerk before
        const clerkUser = await ctx.prisma.users.findFirst({
            where: {
                ClerkId: ctx.auth.clerkId,
            },
        });

        if (clerkUser) return clerkUser;

        // If no email from clerk, throw error
        if (!ctx.auth.email) throw new Error('No email found in auth');

        try {
            // See if old user who has not used clerk yet
            await ctx.prisma.users.update({
                where: {
                    Email: ctx.auth.email,
                },
                data: {
                    ClerkId: ctx.auth.clerkId,
                },
            });

            const user = ctx.prisma.users.findFirst({
                where: {
                    ClerkId: ctx.auth.clerkId,
                },
            });

            if (user) return user;
        } catch (e) {}

        // If no user, create one
        await ctx.prisma.users.create({
            data: {
                Id: uuidv4(),
                ClerkId: ctx.auth.clerkId,
                Email: ctx.auth.email,
                Created: new Date(),
                LastLogin: new Date(),
                LoginCount: 1,
                Paid: false,
                Sex: 'Male',
                Unit: 'Imperial',
                UserRole: 'User',
            },
        });

        return ctx.prisma.users.findFirst({
            where: {
                ClerkId: ctx.auth.clerkId,
            },
        });
    }),
});
