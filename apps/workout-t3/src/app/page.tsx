import { Home } from '~/app/_components/Home/Home';
import { Suspense } from 'react';
import { LoadingSpinner } from '~/app/_components/Loading/LoadingSpinner';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Home />
        </Suspense>
    );
}
