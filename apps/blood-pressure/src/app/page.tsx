import { Suspense } from 'react';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { HeartRateGraph } from '~/app/_components/Body/HeartRateGraph';
import { BloodPressureGraph } from '~/app/_components/Body/BloodPressureGraph';
import { Create } from '~/app/_components/Body/Create';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <>
                <div className="flex w-full flex-col gap-2">
                    <BloodPressureGraph />
                    <HeartRateGraph />
                </div>
                <Create />
            </>
        </Suspense>
    );
}
