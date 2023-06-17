import { type UserSupplement } from './UserSupplement';

export interface UserSupplementActivity {
    id: number;
    updated: string;
    userSupplementId: number;
    userId: string;
    userSupplement: UserSupplement;
    time: number;
}
