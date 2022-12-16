import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    to: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    hidden?: boolean;
}

export const LinkButton: FC<IProps> = ({
    to,
    children,
    className,
    disabled,
    hidden
}) => {
    if (disabled) {
        return (
            <button className={`btn-primary ${className} ${hidden ? 'hidden' : ''}`} disabled>
                {children}
            </button>
        );
    }

    return (
        <Link to={to} className={`${className} ${hidden ? 'hidden' : ''} btn-primary`}>
            {children}
        </Link>
    );
};
