import { CreateCustomWorkout } from "~/_components/WorkoutCustom/CreateCustomWorkout";

export default async function WorkoutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-secondary">
      <div className="container grid grid-cols-1 gap-2">
        <CreateCustomWorkout />
      </div>
    </main>
  );
}
