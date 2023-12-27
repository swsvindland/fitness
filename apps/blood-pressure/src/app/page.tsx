import { Suspense } from 'react';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { BloodPressureGraph } from '~/app/_components/Body/BloodPressure/BloodPressureGraph';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <div className="flex w-full flex-col gap-2">
                <BloodPressureGraph />
                <BloodPressureGraph />
            </div>
        </Suspense>
    );
}
