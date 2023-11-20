import { WorkoutDetail } from "~/app/_components/WorkoutStore/WorkoutDetail";

export default async function WorkoutStorePage({
  params,
}: {
  params: { id: string };
}) {
  if (isNaN(parseInt(params.id))) return null;

  return <WorkoutDetail workoutId={Number(params.id)} />;
}
