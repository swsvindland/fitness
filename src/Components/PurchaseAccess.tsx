import { Button } from './Buttons/Button';
import { FC, useContext } from 'react';
import { AuthContext } from './Auth/Auth';
import { PurchaseOptions } from './PurchaseOptions';

export const PurchaseAccess: FC = () => {
    const { paid, setOpenPurchase } = useContext(AuthContext);

    if (paid) return null;

    return (
        <div className="flex flex-col mb-8">
            <h2 className="text-ternary text-center">
                Welcome to WorkoutTrack. To access all features, please
                subscribe.
            </h2>
            <Button onClick={() => setOpenPurchase(true)}>
                See Subscription Options
            </Button>
            <PurchaseOptions />
        </div>
    );
};
