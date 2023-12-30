import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { AllBloodPressure } from '~/app/_components/Body/AllBloodPressure';

export default async function AllPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AllBloodPressure />
        </Suspense>
    );
}
