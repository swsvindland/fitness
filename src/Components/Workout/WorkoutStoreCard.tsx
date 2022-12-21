import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/Auth';

interface IProps {
    id: number;
    name: string;
    premium: boolean;
}

export const WorkoutStoreCard: FC<IProps> = ({ id, name, premium }) => {
    const { user } = useContext(AuthContext);

    if (premium && !user?.paid) {
        return (
            <div className="m-4 max-w-xl w-96 relative block card bg-primary-dark rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none">
                <span className="flex items-center">
                    <span className="text-sm flex flex-col">
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

    return (
        <Link
            to={`/workout/store/${id}`}
            className="m-4 max-w-xl w-96 relative block card rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none"
        >
            <span className="flex items-center">
                <span className="text-sm flex flex-col">
                    <span className="font-medium text-secondary">{name}</span>
                </span>
            </span>
        </Link>
    );
};
