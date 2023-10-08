import { FC } from 'react';
import { LinkButton } from '../Buttons/LinkButton';
import { UserSupplements } from './UserSupplements';
import { useHideBackButton } from '../Navigation/headerHooks';

export const Supplements: FC = () => {
    useHideBackButton();

    return (
        <div className="container">
            <div className="flex items-center justify-end">
                <LinkButton className="mb-2" to="/supplements/all-supplements">
                    Edit
                </LinkButton>
            </div>
            <UserSupplements />
        </div>
    );
};
