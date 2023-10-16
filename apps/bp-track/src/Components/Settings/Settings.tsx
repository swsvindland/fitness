import { FC } from 'react';
import { DeleteAccount } from '../DeleteAccount';
import { useShowBackButton } from '../Navigation/headerHooks';
import { LinkButton } from '../Buttons/LinkButton';

export const Settings: FC = () => {
    useShowBackButton();

    return (
        <div className="container flex flex-col">
            <h1 className="text-secondary mb-2">Settings</h1>
            <LinkButton to="/settings/units" className="mb-2">
                Change Units
            </LinkButton>
            <LinkButton to="/body/sex" className="mb-2">
                Change Sex
            </LinkButton>
            <LinkButton to="/eat/custom-macros" className="mb-2">
                Set Custom Macros
            </LinkButton>
            <LinkButton to="/settings/change-password" className="mb-2">
                Change Password
            </LinkButton>
            <DeleteAccount />
        </div>
    );
};