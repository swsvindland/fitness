import { AllWeights } from '~/app/_components/Body/Weight/AllWeights';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AllWeights />
        </Suspense>
    );
}
