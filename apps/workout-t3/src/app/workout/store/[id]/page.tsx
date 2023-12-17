import { WorkoutDetail } from '~/app/_components/WorkoutStore/WorkoutDetail';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function WorkoutStorePage({
    params,
}: {
    params: { id: string };
}) {
    if (isNaN(parseInt(params.id))) return null;

    return (
        <Suspense fallback={<LoadingPage />}>
            <WorkoutDetail workoutId={Number(params.id)} />
        </Suspense>
    );
}
