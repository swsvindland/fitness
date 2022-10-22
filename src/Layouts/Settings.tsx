import { FC } from 'react';
import { DeleteAccount } from '../Components/DeleteAccount';

export const Settings: FC = () => {
    return (
        <div>
            <h1 className="text-secondary">Settings</h1>
            <DeleteAccount />
        </div>
    );
};
