import { Workout } from '~/app/_components/Workout/Workout';
import { WorkoutType } from '@fitness/types';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function WorkoutResistancePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Workout type={WorkoutType.Resistance} />
        </Suspense>
    );
}
