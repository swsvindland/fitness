import { userRouter } from './user';
import { macrosRouter } from './macros';
import { createTRPCRouter } from '../trpc';
import { workoutRouter } from './workout';
import { progressPhotosRouter } from './progressPhotos';

export const appRouter = createTRPCRouter({
    progressPhotos: progressPhotosRouter,
    user: userRouter,
    macros: macrosRouter,
    workouts: workoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
