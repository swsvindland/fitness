import { WorkoutStore } from "~/app/_components/WorkoutStore/WorkoutStore";
import { WorkoutType } from "@fitness/types";

export default async function WorkoutStorePage() {
  return <WorkoutStore type={WorkoutType.Vo2Max} />;
}
