import { EditCustomWorkout } from '~/app/_components/WorkoutCustom/EditCustomWorkout';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function WorkoutEditExercises({
    params,
}: {
    params: { id: string };
}) {
    if (isNaN(Number(params.id))) return null;

    return (
        <Suspense fallback={<LoadingPage />}>
            <EditCustomWorkout workoutId={Number(params.id)} />
        </Suspense>
    );
}
