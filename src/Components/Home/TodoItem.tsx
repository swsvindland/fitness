import { FC } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to={route}>
            <div
                className={
                    checked
                        ? 'card p-4 my-2 bg-primary-dark w-full flex flex-row justify-between'
                        : 'card p-4 my-2 w-full flex flex-row justify-between'
                }
            >
                <h2 className="text-lg text-ternary">{name}</h2>
                {checked && (
                    <CircleCheckSolid className="fill-secondary w-6 h-6" />
                )}
            </div>
        </Link>
    );
};
