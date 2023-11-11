import { WorkoutSubstitution } from "~/app/_components/Workout/WorkoutSubstitution";

export default async function WorkoutStorePage({
  params,
}: {
  params: { id: string };
}) {
  if (isNaN(Number(params.id))) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-secondary">
      <div className="container grid grid-cols-1 gap-2">
        <WorkoutSubstitution workoutExerciseId={Number(params.id)} />
      </div>
    </main>
  );
}
