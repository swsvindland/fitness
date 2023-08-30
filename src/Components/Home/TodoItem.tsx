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
            <div className="card my-2 flex w-full flex-row justify-between p-4">
                <h2 className="text-ternary text-lg">{name}</h2>
                {checked && (
                    <CircleCheckSolid className="h-6 w-6 fill-teal-400" />
                )}
            </div>
        </Link>
    );
};
