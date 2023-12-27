import { Suspense } from 'react';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { AllBloodPressure } from '~/app/_components/Body/BloodPressure/AllBloodPressure';

export default async function AllPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AllBloodPressure />
        </Suspense>
    );
}
