export interface Workout {
    id: number;
    userId?: string;
    created: string;
    name: string;
    description: string;
    image: string;
    days: number;
    duration: number;
    premium: boolean;
}
