export interface User {
    id: string;
    created: string;
    lastLogin: string;
    email: string;
    sex: Sex;
    userRole: UserRole;
    unit: Units;
    paid: boolean;
}

export enum Sex {
    Unknown,
    Male,
    Female,
}

export enum Units {
    Imperial,
    Metric,
}

export enum UserRole {
    User,
    FreeUser,
    Admin,
}