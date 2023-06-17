import { type Exercise } from './Exercise';
import { type UserWorkoutActivity } from './UserWorkoutActivity';

export interface UserWorkoutExercise {
    workoutId: number;
    exerciseId: number;
    exercise?: Exercise;
    sets: number;
    minReps?: number;
    maxReps?: number;
    time?: number;
    restTime?: number;
    userWorkoutActivities: UserWorkoutActivity[];
}
