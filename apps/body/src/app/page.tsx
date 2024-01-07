import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { WeightGraph } from '~/app/_components/Weights/WeightGraph';
import { HeightGraph } from '~/app/_components/Height/HeightGraph';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <div className="flex w-full flex-col gap-2">
                <WeightGraph />
                <HeightGraph />
            </div>
        </Suspense>
    );
}
