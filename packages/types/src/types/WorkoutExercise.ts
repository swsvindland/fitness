import { Exercise } from './Exercise';

export interface WorkoutExercise {
    id?: number;
    created?: string;
    workoutId: number;
    exerciseId: number;
    exercise?: Exercise;
    day: number;
    minReps?: number;
    maxReps?: number;
    time?: number;
    order: number;
}
