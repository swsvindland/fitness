import { Food } from './Food';

export interface UserFoodGridItem {
    id?: number;
    userId: string;
    foodId?: number;
    edamamFoodId?: string;
    food?: Food;
    created?: string;
    amount: number;
    unit: string;
    servings: number;
}
