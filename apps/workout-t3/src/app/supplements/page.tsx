"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "~/contexts/UserContext";
import { Supplements } from "~/app/_components/Supplements/Supplements";

export default async function EatPage() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Supplements />
      </QueryClientProvider>
    </UserProvider>
  );
}
