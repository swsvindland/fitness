import { type FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/Auth';

interface IProps {
    id: number;
    name: string;
    premium: boolean;
    custom: boolean;
}

export const WorkoutStoreCard: FC<IProps> = ({ id, name, premium, custom }) => {
    const { user } = useContext(AuthContext);

    if (premium && !user?.paid) {
        return (
            <div className="card relative m-4 cursor-pointer rounded-lg bg-primary-dark px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between">
                <span className="flex items-center">
                    <span className="flex flex-col text-sm">
                        <span className="font-medium text-secondary">
                            {name}
                        </span>
                        <span className="font-small text-ternary">
                            Premium, Subscribe to access
                        </span>
                    </span>
                </span>
            </div>
        );
    }

    const link = custom ? `/workout/custom/${id}` : `/workout/store/${id}`;

    return (
        <Link
            to={link}
            className="card relative m-4 cursor-pointer rounded-lg px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
        >
            <span className="flex items-center">
                <span className="flex flex-col text-sm">
                    <span className="font-medium text-secondary">{name}</span>
                </span>
            </span>
        </Link>
    );
};
