export interface User {
    id: string;
    created: string;
    lastLogin: string;
    email: string;
    sex: Sex;
    access: boolean;
}

export enum Sex {
    Unknown,
    Male,
    Female,
}
