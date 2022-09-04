import { WorkoutBlockExercise } from './WorkoutBlockExercise';

export interface WorkoutBlock {
    id: number;
    created: string;
    workoutId: number;
    blockIndex: number;
    duration: number;
    days: number;
    workoutBlockExercises: WorkoutBlockExercise[];
}
