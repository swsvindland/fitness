import { Suspense } from 'react';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <h1 className="text-secondary">Home</h1>
        </Suspense>
    );
}
