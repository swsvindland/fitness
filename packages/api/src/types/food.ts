export interface Food {
    food_id: number;
    brand_name?: string;
    food_name: string;
    food_type: string;
    food_url: string;
    servings: FoodServings;
}

export interface FoodServings {
    serving: FoodServing[];
}

export interface FoodServing {
    added_sugars?: string;
    calcium?: string;
    calories: string;
    carbohydrates: string;
    cholesterol?: string;
    fat: string;
    fiber?: string;
    iron?: string;
    measurement_description: string;
    metric_serving_amount: string;
    metric_serving_unit: string;
    monounsaturated_fat?: string;
    number_of_units: string;
    polyunsaturated_fat?: string;
    potassium?: string;
    protein: string;
    saturated_fat?: string;
    serving_description: string;
    serving_id: string;
    serving_url: string;
    sodium?: string;
    sugar?: string;
    trans_fat?: string;
    vitamin_a?: string;
    vitamin_c?: string;
    vitamin_d?: string;
}
