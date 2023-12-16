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
import { customMacrosRouter } from './customMacros';

export const appRouter = createTRPCRouter({
    body: bodyRouter,
    customMacros: customMacrosRouter,
    customWorkout: customWorkoutRouter,
    dashboard: dashboardRouter,
    food: foodRouter,
    progressPhotos: progressPhotosRouter,
    macros: macrosRouter,
    store: storeRouter,
    supplements: supplementsRouter,
    workouts: workoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
