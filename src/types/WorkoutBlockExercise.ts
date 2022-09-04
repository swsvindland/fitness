import { Exercise } from './Exercise';

export interface WorkoutBlockExercise {
    id: number;
    created: string;
    workoutBlockId: number;
    exerciseId: number;
    exercise: Exercise;
    day: number;
    sets: number;
    minReps: number;
    maxReps: number;
}
