import { BloodPressureCheckInForm } from '~/app/_components/Body/BloodPressure/BloodPressureCheckInForm';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <BloodPressureCheckInForm />
        </Suspense>
    );
}
