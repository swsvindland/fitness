import { Supplement } from './Supplement';

export interface UserSupplement {
    id?: number;
    userId: string;
    supplementId: number;
    supplement?: Supplement;
    times: string[];
}
