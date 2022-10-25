import { FC } from 'react';
import { LinkButton } from '../Components/Buttons/LinkButton';
import { UserSupplements } from '../Components/Supplements/UserSupplements';
import { useHideBackButton } from '../Components/Navigation/headerHooks';

export const Supplements: FC = () => {
    useHideBackButton();

    return (
        <div className="max-w-2xl w-full">
            <UserSupplements />
            <LinkButton to="/supplements/all-supplements">Edit</LinkButton>
        </div>
    );
};
