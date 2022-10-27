import { FC, MouseEventHandler, ReactNode } from 'react';

interface IProps {
    type?: 'button' | 'reset' | 'submit';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

export const Button: FC<IProps> = ({
    type,
    onClick,
    children,
    className,
    disabled,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${className} inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-secondary bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-800 disabled:cursor-not-allowed`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
