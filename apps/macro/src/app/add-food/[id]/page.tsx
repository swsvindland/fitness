import { FoodDetail } from '~/app/_components/Food/FoodDetail';
import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { AddFood } from '~/app/_components/Food/AddFood';

export default async function WorkoutEditExercises({
    params,
}: {
    params: { id: string };
}) {
    if (isNaN(Number(params.id))) return null;

    return (
        <Suspense fallback={<LoadingPage />}>
            <AddFood meal={Number(params.id)} />
        </Suspense>
    );
}
