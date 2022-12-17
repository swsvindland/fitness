import { FC, useContext } from 'react';
import { LinkButton } from '../Buttons/LinkButton';
import { UserSupplements } from './UserSupplements';
import { useHideBackButton } from '../Navigation/headerHooks';
import { AuthContext } from '../Auth/Auth';

export const Supplements: FC = () => {
    const { paid } = useContext(AuthContext);
    useHideBackButton();

    return (
        <div className="max-w-2xl w-full">
            <UserSupplements />
            <LinkButton to="/supplements/all-supplements">Edit</LinkButton>
        </div>
    );
};
