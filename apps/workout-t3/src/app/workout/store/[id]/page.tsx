import { WorkoutDetail } from "~/app/_components/WorkoutStore/WorkoutDetail";

export default async function WorkoutStorePage({
  params,
}: {
  params: { id: string };
}) {
  if (isNaN(Number(params.id))) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-secondary">
      <div className="container grid grid-cols-1 gap-2">
        <WorkoutDetail workoutId={Number(params.id)} />
      </div>
    </main>
  );
}
