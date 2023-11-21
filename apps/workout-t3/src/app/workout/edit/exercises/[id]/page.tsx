import { EditCustomWorkoutExercises } from "~/app/_components/WorkoutCustom/EditCustomWorkoutExercises";

export default async function WorkoutEditExercises({
  params,
}: {
  params: { id: string };
}) {
  if (isNaN(Number(params.id))) return null;

  return <EditCustomWorkoutExercises workoutId={Number(params.id)} />;
}
