import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    console.log("ctx.auth", ctx.auth);

    const clerkUser = await ctx.db.users.findFirst({
      where: {
        ClerkId: ctx.auth.clerkId,
      },
    });

    if (clerkUser) return clerkUser;

    if (!ctx.auth.email) throw new Error("No email found in auth");

    await ctx.db.users.update({
      where: {
        Email: ctx.auth.email,
      },
      data: {
        ClerkId: ctx.auth.clerkId,
      },
    });

    return ctx.db.users.findFirst({
      where: {
        ClerkId: ctx.auth.clerkId,
      },
    });
  }),
});
