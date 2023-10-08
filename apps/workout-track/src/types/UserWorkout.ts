import { Workout } from './Workout';

export interface UserWorkout {
    id: number;
    created: string;
    userId: string;
    workoutId: number;
    active: boolean;
    workout?: Workout;
}
