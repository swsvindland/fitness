import { FC, MouseEventHandler, ReactNode } from 'react';

interface IProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    className?: string;
}

export const SecondaryButton: FC<IProps> = ({
    onClick,
    children,
    className,
}) => {
    return (
        <button
            onClick={onClick}
            className={`${className} inline-flex items-center px-4 py-2 border border-secondary shadow-sm text-sm font-medium rounded-md text-secondary bg-transparent hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-2`}
        >
            {children}
        </button>
    );
};
