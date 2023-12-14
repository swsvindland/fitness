import { userRouter } from './user';
import { macrosRouter } from './macros';
import { createTRPCRouter } from '../trpc';
import { workoutRouter } from './workout';
import { progressPhotosRouter } from './progressPhotos';
import { dashboardRouter } from './dashboard';
import { storeRouter } from './store';
import { customWorkoutRouter } from './customWorkout';
import { supplementsRouter } from './supplements';
import { foodRouter } from './food';
import { bodyRouter } from './body';

export const appRouter = createTRPCRouter({
    body: bodyRouter,
    customWorkout: customWorkoutRouter,
    dashboard: dashboardRouter,
    food: foodRouter,
    progressPhotos: progressPhotosRouter,
    user: userRouter,
    macros: macrosRouter,
    store: storeRouter,
    supplements: supplementsRouter,
    workouts: workoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
