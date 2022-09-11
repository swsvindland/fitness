export interface UserWorkoutsCompleted {
    id: number;
    userId: string;
    workoutId: number;
    workoutBlock: number;
    week: number;
    day: number;
    created: string;
}
