import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { WeightGraph } from '~/app/_components/Weights/WeightGraph';
import { HeightGraph } from '~/app/_components/Height/HeightGraph';
import { BMIGraph } from '~/app/_components/BMIGraph';
import {BodyGraph} from "~/app/_components/Body/BodyGraph";

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <div className="flex w-full flex-col gap-2">
                <WeightGraph />
                <HeightGraph />
                <BMIGraph />
                <BodyGraph />
            </div>
        </Suspense>
    );
}
