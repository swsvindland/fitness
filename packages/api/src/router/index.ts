import { userRouter } from './user';
import { macrosRouter } from './macros';
import { createTRPCRouter } from '../trpc';

export const appRouter = createTRPCRouter({
    user: userRouter,
    macros: macrosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
