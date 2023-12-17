import { WorkoutType } from '@fitness/types';
import { Workout } from '~/app/_components/Workout/Workout';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function WorkoutPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Workout type={WorkoutType.Cardio} />
        </Suspense>
    );
}
