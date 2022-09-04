export interface UserWorkoutActivity {
    id: number;
    created: string;
    userId: string;
    workoutBlockExerciseId: number;
    set: number;
    reps: number;
    weight: number;
}
