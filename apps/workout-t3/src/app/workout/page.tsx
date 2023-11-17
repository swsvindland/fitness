"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "~/contexts/UserContext";
import { WorkoutTypes } from "~/app/_components/Workout/WorkoutType";

export default async function WorkoutPage() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <WorkoutTypes />
      </QueryClientProvider>
    </UserProvider>
  );
}
