export interface User {
    id: string;
    created: string;
    lastLogin: string | undefined;
    email: string;
    sex: Sex;
    userRole: UserRole;
    unit: Units;
    paid: boolean;
}

export enum Sex {
    Unknown = 'Unknown',
    Male = 'Male',
    Female = 'Female',
}

export enum Units {
    Imperial = 'Imperial',
    Metric = 'Metric',
}

export enum UserRole {
    User,
    FreeUser,
    Admin,
}
