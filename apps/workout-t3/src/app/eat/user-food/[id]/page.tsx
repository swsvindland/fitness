import { UserFoodDetail } from "~/app/_components/Food/UserFoodDetail";

export default async function WorkoutEditExercises({
  params,
}: {
  params: { id: number };
}) {
  if (isNaN(Number(params.id))) return null;

  return <UserFoodDetail userFoodId={params.id} />;
}
