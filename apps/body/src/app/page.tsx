import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { Create } from '~/app/_components/Body/Create';
import { WeightGraph } from '~/app/_components/Weights/WeightGraph';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <>
                <div className="flex w-full flex-col gap-2">
                    <WeightGraph />
                </div>
                <Create />
            </>
        </Suspense>
    );
}
