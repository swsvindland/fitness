import { Button } from '../Buttons/Button';
import { FC, useContext } from 'react';
import { AuthContext } from '../Auth/Auth';
import { PurchaseOptions } from './PurchaseOptions';
import { UpSolid } from '../Icons/UpSolid';

export const PurchaseAccessIcon: FC = () => {
    const { user, setOpenPurchase } = useContext(AuthContext);

    if (user?.paid) return null;

    return (
        <>
            <Button className="!p-2 m-2" onClick={() => setOpenPurchase(true)}>
                <UpSolid className="w-7 h-7 fill-secondary" />
            </Button>
            <PurchaseOptions />
        </>
    );
};
