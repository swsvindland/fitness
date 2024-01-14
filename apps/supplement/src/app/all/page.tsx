import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { Supplements } from '~/app/_components/Supplements/Supplements';
import { AllSupplements } from '~/app/_components/Supplements/AllSupplements';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AllSupplements />
        </Suspense>
    );
}
