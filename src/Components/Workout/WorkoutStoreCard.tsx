import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    id: number;
    name: string;
    version: number;
    price?: number;
}

export const WorkoutStoreCard: FC<IProps> = ({ id, name, version, price }) => {
    return (
        <Link
            to={`/workout/${id}`}
            className="m-4 max-w-xl w-96 relative block bg-card rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none"
        >
            <span className="flex items-center">
                <span className="text-sm flex flex-col">
                    <span className="font-medium text-secondary">{name}</span>
                    <span className="text-ternary">
                        <span className="block sm:inline">
                            Version: {version}
                        </span>
                    </span>
                </span>
            </span>
            <span className="mt-2 flex text-sm sm:mt-0 sm:flex-col sm:ml-4 sm:text-right">
                <span className="font-medium text-secondary">
                    {price ? `$${price}` : ''}
                </span>
            </span>
            <span
                className="border-indigo-500 border-transparent absolute -inset-px rounded-lg pointer-events-none"
                aria-hidden="true"
            />
        </Link>
    );
};
