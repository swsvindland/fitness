import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { v4 as uuidv4 } from "uuid";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    // return user who has authed with clerk before
    const clerkUser = await ctx.db.users.findFirst({
      where: {
        ClerkId: ctx.auth.clerkId,
      },
    });

    if (clerkUser) return clerkUser;

    // If no email from clerk, throw error
    if (!ctx.auth.email) throw new Error("No email found in auth");

    try {
      // See if old user who has not used clerk yet
      await ctx.db.users.update({
        where: {
          Email: ctx.auth.email,
        },
        data: {
          ClerkId: ctx.auth.clerkId,
        },
      });

      const user = ctx.db.users.findFirst({
        where: {
          ClerkId: ctx.auth.clerkId,
        },
      });

      if (user) return user;
    } catch (e) {}

    // If no user, create one
    await ctx.db.users.create({
      data: {
        Id: uuidv4(),
        ClerkId: ctx.auth.clerkId,
        Email: ctx.auth.email,
        Created: new Date(),
        LastLogin: new Date(),
        LoginCount: 1,
        Paid: false,
        Sex: "Male",
        Unit: "Imperial",
        UserRole: "User",
      },
    });

    return ctx.db.users.findFirst({
      where: {
        ClerkId: ctx.auth.clerkId,
      },
    });
  }),
});
