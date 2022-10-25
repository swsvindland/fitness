import { FC } from 'react';
import { DeleteAccount } from '../Components/DeleteAccount';
import { useShowBackButton } from '../Components/Navigation/headerHooks';

export const Settings: FC = () => {
    useShowBackButton();

    return (
        <div>
            <h1 className="text-secondary">Settings</h1>
            <DeleteAccount />
        </div>
    );
};
