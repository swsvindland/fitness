export interface FoodSearchServings {
    added_sugars: string;
    calcium: string;
    calories: string;
    carbohydrate: string;
    cholesterol: string;
    fat: string;
    fiber: string;
    iron: string;
    is_default: string;
    measurement_description: string;
    number_of_units: string;
    potassium: string;
    protein: string;
    saturated_fat: string;
    serving_description: string;
    serving_id: string;
    serving_url: string;
    sodium: string;
    sugar: string;
    trans_fat: string;
}

export interface FoodSearch {
    food_id: string;
    food_name: string;
    brand_name: string;
    food_type: string;
    food_url: string;
    servings: {
        serving: FoodSearchServings[];
    };
}
