import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="bg-background text-secondary flex min-h-screen flex-col items-center justify-center">
      <div className="bg-card grid grid-cols-2 rounded-2xl shadow">
        <div className="p-4">
          <h1>WorkoutTrack</h1>
          <p>Track your workouts</p>
          <p>Marketing crap goes here</p>
        </div>
        <SignIn />
      </div>
    </main>
  );
}
