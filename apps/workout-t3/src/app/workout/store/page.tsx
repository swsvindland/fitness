import { WorkoutStore } from "~/app/_components/WorkoutStore/WorkoutStore";

export default async function WorkoutStorePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-secondary">
      <div className="container grid grid-cols-1 gap-2">
        <WorkoutStore />
      </div>
    </main>
  );
}
