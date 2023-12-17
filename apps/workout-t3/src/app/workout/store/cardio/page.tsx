import { WorkoutStore } from '~/app/_components/WorkoutStore/WorkoutStore';
import { WorkoutType } from '@fitness/types';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function WorkoutStorePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <WorkoutStore type={WorkoutType.Cardio} />
        </Suspense>
    );
}
