import { userRouter } from './user';
import { macrosRouter } from './macros';
import { createTRPCRouter } from '../trpc';
import { workoutRouter } from './workout';
import { progressPhotosRouter } from './progressPhotos';
import { dashboardRouter } from './dashboard';
import { storeRouter } from './store';
import { customWorkoutRouter } from './customWorkout';

export const appRouter = createTRPCRouter({
    customWorkout: customWorkoutRouter,
    dashboard: dashboardRouter,
    progressPhotos: progressPhotosRouter,
    user: userRouter,
    macros: macrosRouter,
    store: storeRouter,
    workouts: workoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
