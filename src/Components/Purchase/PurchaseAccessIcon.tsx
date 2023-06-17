import { Button } from '../Buttons/Button';
import { type FC, useContext } from 'react';
import { AuthContext } from '../Auth/Auth';
import { PurchaseOptions } from './PurchaseOptions';
import { UpSolid } from '../Icons/UpSolid';

export const PurchaseAccessIcon: FC = () => {
    const { user, setOpenPurchase } = useContext(AuthContext);

    if (user?.paid) return null;

    return (
        <>
            <Button className="m-2 !p-2" onClick={() => setOpenPurchase(true)}>
                <UpSolid className="h-7 w-7 fill-secondary" />
            </Button>
            <PurchaseOptions />
        </>
    );
};
