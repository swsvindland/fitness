export interface FoodV2 {
    Id: bigint;
    Brand: string | null;
    Name: string;
    FoodType: string;
    Created: Date;
    Updated: Date;
    FoodV2Servings: FoodV2Serving[];
}

export interface FoodV2Serving {
    Id: bigint;
    FoodV2Id: bigint;
    Calories: number | null;
    Carbohydrate: number | null;
    Fat: number | null;
    Protein: number | null;
    MeasurementDescription: string | null;
    MetricServingAmount: number | null;
    MetricServingUnit: string | null;
    ServingDescription: string | null;
    Created: Date | null;
    Updated: Date | null;
    AddedSugar: number | null;
    Calcium: number | null;
    Cholesterol: number | null;
    Fiber: number | null;
    Iron: number | null;
    MonounsaturatedFat: number | null;
    NumberOfUnits: number | null;
    PolyunsaturatedFat: number | null;
    Potassium: number | null;
    SaturatedFat: number | null;
    Sodium: number | null;
    Sugar: number | null;
    TransFat: number | null;
    VitaminA: number | null;
    VitaminC: number | null;
    VitaminD: number | null;
}
