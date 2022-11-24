export interface UserWorkoutActivity {
    id: number;
    created: string;
    userId: string;
    workoutExerciseId: number;
    set: number;
    reps: number;
    weight: number;
    week: number;
    day: number;
    saved: boolean;
}
