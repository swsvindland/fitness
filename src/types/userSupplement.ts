import { Supplement } from './supplement';

export interface UserSupplement {
    id?: number;
    userId: string;
    supplementId: number;
    supplement?: Supplement;
    times: string[];
}
