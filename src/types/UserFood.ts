import { Food } from './Food';

export interface UserFood {
    id: number;
    userId: string;
    foodId: number;
    food?: Food;
    created: string;
    amount: number;
    units: string;
}
