import { Exercise } from './Exercise';

export interface UserWorkoutSubstitution {
    id?: number;
    userId: string;
    workoutExerciseId: number;
    exerciseId: number;
    exercise?: Exercise;
    created: string;
    updated: string;
}
