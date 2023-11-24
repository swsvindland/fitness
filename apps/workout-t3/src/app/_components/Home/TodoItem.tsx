import { FC } from 'react';
import Link from 'next/link';
import { CircleCheckSolid } from '../Icons/CircleCheckSolid';

interface IProps {
    name: string;
    show: boolean;
    checked: boolean;
    route: string;
}
export const TodoItem: FC<IProps> = ({ name, show, checked, route }) => {
    if (!show) {
        return null;
    }

    return (
        <Link href={route}>
            <div
                className={
                    checked
                        ? 'card bg-primary-dark my-2 flex w-full flex-row justify-between p-4'
                        : 'card my-2 flex w-full flex-row justify-between p-4'
                }
            >
                <h2 className="text-ternary text-lg">{name}</h2>
                {checked && (
                    <CircleCheckSolid className="fill-secondary h-6 w-6" />
                )}
            </div>
        </Link>
    );
};
