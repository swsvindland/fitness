import { WorkoutSubstitution } from "~/app/_components/Workout/WorkoutSubstitution";

export default async function WorkoutStorePage({
  params,
}: {
  params: { id: string };
}) {
  if (isNaN(Number(params.id))) return null;

  return <WorkoutSubstitution workoutExerciseId={Number(params.id)} />;
}
