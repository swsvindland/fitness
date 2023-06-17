import React, { type FC } from 'react';

interface IProps {
    isLoading: boolean;
}

export const LoadingCard: FC<IProps> = ({ isLoading }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div role="status" className="w-full animate-pulse">
            <div className="my-2 h-80 rounded-2xl bg-teal-100 dark:bg-teal-900"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};
