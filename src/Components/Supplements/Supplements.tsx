import { FC } from 'react';
import { LinkButton } from '../Buttons/LinkButton';
import { UserSupplements } from './UserSupplements';
import { useHideBackButton } from '../Navigation/headerHooks';

export const Supplements: FC = () => {
    useHideBackButton();

    return (
        <div className="max-w-2xl w-full">
            <UserSupplements />
            <LinkButton to="/supplements/all-supplements">Edit</LinkButton>
        </div>
    );
};
