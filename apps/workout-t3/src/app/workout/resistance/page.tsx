import { Workout } from "~/app/_components/Workout/Workout";
import { WorkoutType } from "@fitness/types";

export default async function WorkoutResistancePage() {
  return <Workout type={WorkoutType.Resistance} />;
}
