import { Button } from '../Buttons/Button';
import { FC, useContext } from 'react';
import { AuthContext } from '../Auth/Auth';
import { PurchaseOptions } from './PurchaseOptions';

interface IProps {
    body: string;
    button: string;
}

export const PurchaseAccess: FC<IProps> = ({ body, button }) => {
    const { user, setOpenPurchase } = useContext(AuthContext);

    if (user?.paid) return null;

    return (
        <div className="mb-8 flex flex-col">
            <h2 className="text-center text-ternary">{body}</h2>
            <Button onClick={() => setOpenPurchase(true)}>{button}</Button>
            <PurchaseOptions />
        </div>
    );
};
