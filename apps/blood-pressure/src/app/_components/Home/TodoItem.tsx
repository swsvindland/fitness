import { FC } from 'react';
import Link from 'next/link';

interface IProps {
    name: string;
    show: boolean;
    route: string;
}
export const TodoItem: FC<IProps> = ({ name, show, route }) => {
    if (!show) {
        return null;
    }

    return (
        <Link href={route}>
            <div className="card hover:bg-primary-dark active:bg-background my-2 flex w-full cursor-pointer p-4">
                <h2 className="text-ternary text-lg">{name}</h2>
            </div>
        </Link>
    );
};
