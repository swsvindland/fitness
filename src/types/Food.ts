export interface Food {
    foodId: string;
    label: string;
    knownAs: string;
    nutrients: Nutrients;
    category: string;
    categoryLabel: string;
    image: string;
}

export interface Nutrients {
    ENERC_KCAL: number;
    PROCNT: number;
    FAT: number;
    CHOCDF: number;
    FIBTG: number;
}
