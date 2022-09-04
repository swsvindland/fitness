import { FC } from 'react';
import { LinkButton } from '../Components/Buttons/LinkButton';
import { UserSupplements } from '../Components/Supplements/UserSupplements';

export const Supplements: FC = () => {
    return (
        <div className="max-w-2xl w-full">
            <UserSupplements />
            <LinkButton to="/supplements/all-supplements">Edit</LinkButton>
        </div>
    );
};
