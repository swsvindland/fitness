import { FC, useContext } from 'react';
import { AuthContext } from '../Auth/Auth';
import { PurchaseOptions } from './PurchaseOptions';

export const PurchaseAccess: FC = () => {
    const { user } = useContext(AuthContext);

    if (user?.paid) return null;

    return (
        <div className="mb-8 flex flex-col">
            <PurchaseOptions />
        </div>
    );
};
