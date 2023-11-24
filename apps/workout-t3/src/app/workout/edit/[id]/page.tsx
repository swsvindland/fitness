import { EditCustomWorkout } from '~/app/_components/WorkoutCustom/EditCustomWorkout';

export default async function WorkoutEditExercises({
    params,
}: {
    params: { id: string };
}) {
    if (isNaN(Number(params.id))) return null;

    return <EditCustomWorkout workoutId={Number(params.id)} />;
}
