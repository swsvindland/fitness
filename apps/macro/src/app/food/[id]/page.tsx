import { FoodDetail } from '~/app/_components/Food/FoodDetail';
import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';

export default async function WorkoutEditExercises({
    params,
}: {
    params: { id: string };
}) {
    if (isNaN(Number(params.id))) return null;

    return (
        <Suspense fallback={<LoadingPage />}>
            <FoodDetail foodId={Number(params.id)} />
        </Suspense>
    );
}
