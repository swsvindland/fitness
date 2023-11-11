"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "~/contexts/UserContext";
import { Workout } from "~/app/_components/Workout/Workout";

export default async function WorkoutPage() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Workout />
      </QueryClientProvider>
    </UserProvider>
  );
}
