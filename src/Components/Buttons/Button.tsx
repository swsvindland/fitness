import { type FC, type MouseEventHandler, type ReactNode } from 'react';

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
            className={`${className ?? ''} btn-primary`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
