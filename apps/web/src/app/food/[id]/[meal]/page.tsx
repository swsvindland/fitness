import { FoodDetail } from '~/app/_components/Food/FoodDetail';
import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';

export default async function WorkoutEditExercises({
    params,
}: {
    params: { id: string; meal: string };
}) {
    if (isNaN(Number(params.id))) return null;
    if (isNaN(Number(params.meal))) return null;

    return (
        <Suspense fallback={<LoadingPage />}>
            <FoodDetail foodId={Number(params.id)} meal={Number(params.meal)} />
        </Suspense>
    );
}
