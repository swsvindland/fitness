export interface UserNextWorkout {
    id: number;
    userId: string;
    workoutId: number;
    workoutBlock: number;
    week: number;
    day: number;
    created: string;
    workoutCompleted: boolean;
}
