import { userRouter } from './user';
import { macrosRouter } from './macros';
import { createTRPCRouter } from '../trpc';
import { workoutRouter } from './workout';
import { progressPhotosRouter } from './progressPhotos';
import { dashboardRouter } from './dashboard';

export const appRouter = createTRPCRouter({
    dashboard: dashboardRouter,
    progressPhotos: progressPhotosRouter,
    user: userRouter,
    macros: macrosRouter,
    workouts: workoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
