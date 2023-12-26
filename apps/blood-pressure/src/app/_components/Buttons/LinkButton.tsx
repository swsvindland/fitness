import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface IProps {
    to: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

export const LinkButton: FC<IProps> = ({
    to,
    children,
    className,
    disabled,
}) => {
    if (disabled) {
        return (
            <button className={`btn-primary ${className}`} disabled>
                {children}
            </button>
        );
    }

    return (
        <Link href={to} className={`${className} btn-primary`}>
            {children}
        </Link>
    );
};
