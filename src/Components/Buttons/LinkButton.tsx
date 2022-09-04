import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    to: string;
    children: ReactNode;
    className?: string;
}

export const LinkButton: FC<IProps> = ({ to, children, className }) => {
    return (
        <Link
            to={to}
            className={`${className} inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-secondary bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
            {children}
        </Link>
    );
};
