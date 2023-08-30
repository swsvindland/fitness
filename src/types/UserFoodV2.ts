import { Food, Serving } from './Food';

export interface UserFoodV2 {
    id?: number;
    userId: string;
    foodV2Id: number;
    foodV2?: Food;
    servingId: number;
    serving?: Serving;
    servingAmount: number;
    created?: string;
    updated?: string;
}
