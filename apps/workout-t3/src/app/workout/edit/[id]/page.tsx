import { EditCustomWorkout } from "~/app/_components/WorkoutCustom/EditCustomWorkout";

export default async function WorkoutEditExercises({
  params,
}: {
  params: { id: number };
}) {
  if (isNaN(Number(params.id))) return null;

  return <EditCustomWorkout workoutId={params.id} />;
}
