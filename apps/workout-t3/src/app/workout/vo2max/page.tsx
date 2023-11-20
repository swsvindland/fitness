import { WorkoutType } from "@fitness/types";
import { Workout } from "~/app/_components/Workout/Workout";

export default async function WorkoutPage() {
  return <Workout type={WorkoutType.Vo2Max} />;
}
