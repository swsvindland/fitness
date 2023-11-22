export interface Supplement {
    id: number;
    created: string;
    name: string;
    icon: SupplementIcon;
}

export enum SupplementIcon {
    Unknown = 'Unknown',
    SmallScoop = 'SmallScoop',
    LargeScoop = 'LargeScoop',
    Capsule = 'Capsule',
    Tablet = 'Tablet',
    Liquid = 'Liquid',
    Injection = 'Injection',
}
