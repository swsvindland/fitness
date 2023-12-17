import { WorkoutTypes } from '~/app/_components/Workout/WorkoutType';
import { LoadingSpinner } from '~/app/_components/Loading/LoadingSpinner';
import { Suspense } from 'react';

export default async function WorkoutPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <WorkoutTypes />
        </Suspense>
    );
}
