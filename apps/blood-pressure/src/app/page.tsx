import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { HeartRateGraph } from '~/app/_components/Body/HeartRateGraph';
import { BloodPressureGraph } from '~/app/_components/Body/BloodPressureGraph';
import { Create } from '~/app/_components/Body/Create';
import { Avg } from '~/app/_components/Body/Avg';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <>
                <div className="flex w-full flex-col gap-2">
                    <Avg />
                    <BloodPressureGraph />
                    <HeartRateGraph />
                </div>
                <Create />
            </>
        </Suspense>
    );
}
