import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    to: string;
    children: ReactNode;
    className?: string;
}

export const LinkSecondaryButton: FC<IProps> = ({
    to,
    children,
    className,
}) => {
    return (
        <Link
            to={to}
            className={`${className} inline-flex items-center px-4 py-2 border border-secondary shadow-sm text-sm font-medium rounded-md text-secondary bg-transparent hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-2 disabled:text-grey-300 disabled:border-grey-800 disabled:cursor-not-allowed`}
        >
            {children}
        </Link>
    );
};
