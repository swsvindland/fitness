import React, { FC } from 'react';

interface IProps {
    isLoading: boolean;
}

export const LoadingCard: FC<IProps> = ({ isLoading }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div role="status" className="w-full animate-pulse">
            <div className="bg-card dark:bg-primary-dark my-2 h-80 rounded"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};
