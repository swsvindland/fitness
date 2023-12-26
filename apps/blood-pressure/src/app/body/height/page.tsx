import { HeightForm } from '~/app/_components/Body/Height/HeightForm';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function HeightPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <HeightForm />
        </Suspense>
    );
}
