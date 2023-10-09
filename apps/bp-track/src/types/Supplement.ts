export interface Supplement {
    id: number;
    created: string;
    name: string;
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
