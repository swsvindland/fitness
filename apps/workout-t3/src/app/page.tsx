import { Home } from '~/app/_components/Home/Home';
import { Suspense } from 'react';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Home />
        </Suspense>
    );
}
