import { FoodDetail } from '~/app/_components/Food/FoodDetail';

export default async function WorkoutEditExercises({
    params,
}: {
    params: { id: number };
}) {
    if (isNaN(Number(params.id))) return null;

    return <FoodDetail foodId={params.id} />;
}
