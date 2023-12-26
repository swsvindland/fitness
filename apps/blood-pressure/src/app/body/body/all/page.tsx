import { AllBody } from '~/app/_components/Body/Body/AllBody';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AllBody />
        </Suspense>
    );
}
