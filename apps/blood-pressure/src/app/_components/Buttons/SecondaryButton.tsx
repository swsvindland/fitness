import { FC, MouseEventHandler, ReactNode } from 'react';

interface IProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

export const SecondaryButton: FC<IProps> = ({
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
            className={`${className} btn-secondary`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
