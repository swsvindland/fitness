import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { AllHeights } from '~/app/_components/Height/AllHeights';

export default async function AllPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AllHeights />
        </Suspense>
    );
}
