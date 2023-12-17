import { CreateCustomWorkout } from '~/app/_components/WorkoutCustom/CreateCustomWorkout';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function WorkoutPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <CreateCustomWorkout />
        </Suspense>
    );
}
