import { UserFoodDetail } from "~/app/_components/Food/UserFoodDetail";

export default async function WorkoutEditExercises({
  params,
}: {
  params: { id: number };
}) {
  if (isNaN(Number(params.id))) return null;

  return (
    <main className="flex min-h-screen flex-col items-center text-secondary">
      <div className="container grid grid-cols-1 gap-2">
        <UserFoodDetail userFoodId={params.id} />
      </div>
    </main>
  );
}
