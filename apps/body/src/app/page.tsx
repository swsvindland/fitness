import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { WeightGraph } from '~/app/_components/Weights/WeightGraph';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <div className="flex w-full flex-col gap-2">
                <WeightGraph />
            </div>
        </Suspense>
    );
}
