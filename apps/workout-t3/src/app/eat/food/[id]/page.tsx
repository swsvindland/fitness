import { FoodDetail } from '~/app/_components/Food/FoodDetail';
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
            <FoodDetail foodId={Number(params.id)} />
        </Suspense>
    );
}
