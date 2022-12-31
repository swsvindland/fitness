export interface Food {
    id: number;
    brand?: string;
    name: string;
    foodType: string;
    servings: Serving[];
}

export interface Serving {
    id: number;
    foodV2Id: number;
    addedSugar: number;
    calcium: number;
    calories: number;
    carbohydrate: number;
    cholesterol: number;
    fat: number;
    fiber: number;
    iron: number;
    measurementDescription: string;
    metricServingAmount: number;
    metricServingUnit: string;
    monounsaturatedFat: string;
    numberOfUnits: number;
    polyunsaturatedFat: number;
    potassium: number;
    protein: number;
    saturatedFat: number;
    servingDescription: string;
    servingId: number;
    sodium: number;
    sugar: number;
    transFat: number;
    vitaminA: number;
    vitaminC: number;
    vitaminD: number;
}
