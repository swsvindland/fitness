import { EditCustomWorkoutExercises } from "~/_components/WorkoutCustom/EditCustomWorkoutExercises";

export default async function WorkoutEditExercises({
  params,
}: {
  params: { id: number };
}) {
  if (isNaN(Number(params.id))) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-secondary">
      <div className="container grid grid-cols-1 gap-2">
        <EditCustomWorkoutExercises workoutId={params.id} />
      </div>
    </main>
  );
}
