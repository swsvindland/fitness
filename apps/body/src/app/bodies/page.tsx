import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { AllBodies } from '../_components/Body/AllBodies';

export default async function AllPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AllBodies />
        </Suspense>
    );
}
