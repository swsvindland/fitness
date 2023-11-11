"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "~/contexts/UserContext";
import { Eat } from "~/app/_components/Macros/Eat";

export default async function EatPage() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Eat />
      </QueryClientProvider>
    </UserProvider>
  );
}
