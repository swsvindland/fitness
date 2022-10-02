export interface EdamamFood {
    foodId: string;
    label: string;
    knownAs: string;
    nutrients: EdamamNutrients;
    category: string;
    categoryLabel: string;
    image: string;
}

export interface EdamamNutrients {
    ENERC_KCAL: number;
    PROCNT: number;
    FAT: number;
    CHOCDF: number;
    FIBTG: number;
}
