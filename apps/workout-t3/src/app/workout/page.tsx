import { WorkoutTypes } from '~/app/_components/Workout/WorkoutType';
import { Suspense } from 'react';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';

export default async function WorkoutPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <WorkoutTypes />
        </Suspense>
    );
}
