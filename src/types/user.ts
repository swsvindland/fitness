export interface User {
    id: string;
    created: string;
    lastLogin: string;
    email: string;
    sex: Sex;
    userRole: UserRole;
}

export enum Sex {
    Unknown,
    Male,
    Female,
}

export enum UserRole {
    User,
    FreeUser,
    Admin,
}
