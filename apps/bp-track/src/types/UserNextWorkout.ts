export interface UserNextWorkout {
    id: number;
    userId: string;
    workoutId: number;
    week: number;
    day: number;
    created: string;
    workoutCompleted: boolean;
}
