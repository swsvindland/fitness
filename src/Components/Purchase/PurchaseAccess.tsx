import { FC, useContext } from 'react';
import { AuthContext } from '../Auth/Auth';
import { PurchaseOptions } from './PurchaseOptions';
import {Capacitor} from "@capacitor/core";

export const PurchaseAccess: FC = () => {
    const { user } = useContext(AuthContext);

    if (user?.paid) return null;
    if (Capacitor.getPlatform() === 'web') return null;

    return (
        <div className="mb-8 flex flex-col">
            <PurchaseOptions />
        </div>
    );
};
