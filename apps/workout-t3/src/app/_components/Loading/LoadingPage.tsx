import { FC } from 'react';
import { LoadingSpinner } from '~/app/_components/Loading/LoadingSpinner';

export const LoadingPage: FC = () => {
    return (
        <main className="text-secondary flex min-h-screen flex-col items-center justify-center">
            <LoadingSpinner />
        </main>
    );
};
