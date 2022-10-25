import { EdamamFood } from './EdamamFood';

export interface EdamamFoodHint {
    food: EdamamFood;
    measures: EdamamMeasure[];
}

export interface EdamamMeasure {
    uri: string;
    label: string;
    weight: number;
}
