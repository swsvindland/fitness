import { AllSupplements } from '~/app/_components/Supplements/AllSupplements';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AllSupplements />
        </Suspense>
    );
}
