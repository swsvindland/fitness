import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { AllWeights } from '~/app/_components/Weights/AllWeights';

export default async function AllPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AllWeights />
        </Suspense>
    );
}
