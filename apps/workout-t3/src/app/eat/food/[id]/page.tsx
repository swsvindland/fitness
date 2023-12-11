import { FoodDetail } from '~/app/_components/Food/FoodDetail';

export default async function WorkoutEditExercises({
    params,
}: {
    params: { id: string };
}) {
    if (isNaN(Number(params.id))) return null;

    return <FoodDetail foodId={Number(params.id)} />;
}
