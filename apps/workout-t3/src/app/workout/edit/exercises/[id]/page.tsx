import { EditCustomWorkoutExercises } from '~/app/_components/WorkoutCustom/EditCustomWorkoutExercises';
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
            <EditCustomWorkoutExercises workoutId={Number(params.id)} />
        </Suspense>
    );
}
