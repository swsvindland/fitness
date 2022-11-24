import { Exercise } from './Exercise';

export interface WorkoutExercise {
    id: number;
    created: string;
    workoutId: number;
    exerciseId: number;
    exercise: Exercise;
    day: number;
    sets: number;
    minReps: number;
    maxReps: number;
}
