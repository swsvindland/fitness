import { FC } from 'react';
import Link from 'next/link';

interface IProps {
    id: bigint;
    name: string;
    custom: boolean;
}

export const WorkoutStoreCard: FC<IProps> = ({ id, name, custom }) => {
    const link = custom ? `/workout/custom/${id}` : `/workout/store/${id}`;

    return (
        <Link
            href={link}
            className="card relative m-4 cursor-pointer rounded-lg px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
        >
            <span className="flex items-center">
                <span className="flex flex-col text-sm">
                    <span className="text-secondary font-medium">{name}</span>
                </span>
            </span>
        </Link>
    );
};
