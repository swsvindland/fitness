import { AllBloodPressure } from '~/app/_components/Body/BloodPressure/AllBloodPressure';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AllBloodPressure />
        </Suspense>
    );
}
