export interface EdamamFoodDetails {
    calories: number;
    totalWeights: number;
    totalNutrients: EdamamTotalNutrients;
}

export interface EdamamTotalNutrients {
    ENERC_KCAL: EdamamNutrient;
    FAT: EdamamNutrient;
    FASAT: EdamamNutrient;
    FAMS: EdamamNutrient;
    CHOCDF: EdamamNutrient;
    FIBTG: EdamamNutrient;
    SUGAR: EdamamNutrient;
    PROCNT: EdamamNutrient;
    CHOLE: EdamamNutrient;
    NA: EdamamNutrient;
    CA: EdamamNutrient;
    MG: EdamamNutrient;
    K: EdamamNutrient;
    FE: EdamamNutrient;
    ZN: EdamamNutrient;
    P: EdamamNutrient;
    VITA_RAE: EdamamNutrient;
    VITC: EdamamNutrient;
    THIA: EdamamNutrient;
    RIBF: EdamamNutrient;
    NIA: EdamamNutrient;
    VITB6A: EdamamNutrient;
    FOLDFE: EdamamNutrient;
    FOLFD: EdamamNutrient;
    FOLAC: EdamamNutrient;
    VITB12: EdamamNutrient;
    VITD: EdamamNutrient;
    TOCPHA: EdamamNutrient;
    VITK1: EdamamNutrient;
    WATER: EdamamNutrient;
}

export interface EdamamNutrient {
    label: string;
    quantity: number;
    unit: string;
}
