import { FC, MouseEventHandler, ReactNode } from 'react';

interface IProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
}

export const SecondaryButton: FC<IProps> = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {children}
        </button>
    );
};
