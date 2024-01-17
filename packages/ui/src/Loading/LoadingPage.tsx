import { FC } from 'react';
import { Spinner } from '@nextui-org/react';

export const LoadingPage: FC = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <Spinner />
        </main>
    );
};
