"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "~/contexts/UserContext";
import { WorkoutStore } from "~/_components/WorkoutStore/WorkoutStore";

export default async function WorkoutStorePage() {
  const queryClient = new QueryClient();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-secondary">
      <div className="container grid grid-cols-1 gap-2">
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <WorkoutStore />
          </QueryClientProvider>
        </UserProvider>
      </div>
    </main>
  );
}
