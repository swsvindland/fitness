import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { AllBloodPressure } from '~/app/_components/Body/AllBloodPressure';
import { Create } from '~/app/_components/Body/Create';

export default async function AllPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AllBloodPressure />
            <Create />
        </Suspense>
    );
}
