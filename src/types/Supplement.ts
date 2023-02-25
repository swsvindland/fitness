export interface Supplement {
    id: number;
    created: string;
    name: string;
    brand: string;
    url: string;
    commission: number;
    icon: SupplementIcon;
}

export enum SupplementIcon {
    Unknown,
    SmallScoop,
    LargeScoop,
    Capsule,
    Tablet,
    Liquid,
    Injection,
}
