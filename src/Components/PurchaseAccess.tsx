import { Button } from './Buttons/Button';
import { FC, useContext } from 'react';
import { AuthContext } from './Auth/Auth';
import { PurchaseOptions } from './PurchaseOptions';

interface IProps {
    body: string;
    button: string;
}

export const PurchaseAccess: FC<IProps> = ({ body, button }) => {
    const { paid, setOpenPurchase } = useContext(AuthContext);

    if (paid) return null;

    return (
        <div className="flex flex-col mb-8">
            <h2 className="text-ternary text-center">{body}</h2>
            <Button onClick={() => setOpenPurchase(true)}>{button}</Button>
            <PurchaseOptions />
        </div>
    );
};
