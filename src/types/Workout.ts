export interface Workout {
    id: number;
    created: string;
    version: number;
    name: string;
    description: string[];
    cost?: number;
}
