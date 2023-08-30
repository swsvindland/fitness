import { FC, MouseEventHandler, ReactNode } from 'react';

interface IProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

export const SecondaryButton: FC<IProps> = ({
    onClick,
    children,
    className,
    disabled,
}) => {
    return (
        <button
            onClick={onClick}
            className={`${className} btn-secondary`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
