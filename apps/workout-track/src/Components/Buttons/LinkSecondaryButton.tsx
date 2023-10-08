import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    to: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

export const LinkSecondaryButton: FC<IProps> = ({
    to,
    children,
    className,
    disabled,
}) => {
    if (disabled) {
        return (
            <button className={`btn-secondary ${className}`} disabled>
                {children}
            </button>
        );
    }

    return (
        <Link to={to} className={`${className} btn-secondary`}>
            {children}
        </Link>
    );
};
