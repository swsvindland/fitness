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
        <Link to={to} className={`${className} btn-secondary`}>
            {children}
        </Link>
    );
};
