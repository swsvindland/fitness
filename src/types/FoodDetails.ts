export interface FoodDetails {
    calories: number;
    totalWeights: number;
    totalNutrients: TotalNutrients;
}

export interface TotalNutrients {
    ENERC_KCAL: Nutrient;
    FAT: Nutrient;
    FASAT: Nutrient;
    FAMS: Nutrient;
    CHOCDF: Nutrient;
    FIBTG: Nutrient;
    SUGAR: Nutrient;
    PROCNT: Nutrient;
    CHOLE: Nutrient;
    NA: Nutrient;
    CA: Nutrient;
    MG: Nutrient;
    K: Nutrient;
    FE: Nutrient;
    ZN: Nutrient;
    P: Nutrient;
    VITA_RAE: Nutrient;
    VITC: Nutrient;
    THIA: Nutrient;
    RIBF: Nutrient;
    NIA: Nutrient;
    VITB6A: Nutrient;
    FOLDFE: Nutrient;
    FOLFD: Nutrient;
    FOLAC: Nutrient;
    VITB12: Nutrient;
    VITD: Nutrient;
    TOCPHA: Nutrient;
    VITK1: Nutrient;
    WATER: Nutrient;
}

export interface Nutrient {
    label: string;
    quantity: number;
    unit: string;
}
