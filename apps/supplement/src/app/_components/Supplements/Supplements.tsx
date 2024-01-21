import { FC } from 'react';
import { UserSupplements } from './UserSupplements';

export const Supplements: FC = async () => {
    return (
        <div className="container">
            <UserSupplements />
        </div>
    );
};
