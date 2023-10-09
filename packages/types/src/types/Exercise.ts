export interface Exercise {
    id: number;
    created: string;
    name: string;
    icon?: ExerciseIcon;
}

export enum ExerciseIcon {
    Unknown,
    Barbell,
    Dumbbell,
    Cable,
    Machine,
    Bodyweight,
    Band,
    Cardio,
}
