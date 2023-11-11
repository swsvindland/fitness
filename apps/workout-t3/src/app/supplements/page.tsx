"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "~/contexts/UserContext";
import { Supplements } from "~/app/_components/Supplements/Supplements";

export default async function EatPage() {
  const queryClient = new QueryClient();

  return (
    <main className="flex min-h-screen flex-col items-center text-secondary">
      <div className="container grid grid-cols-1 gap-2">
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Supplements />
          </QueryClientProvider>
        </UserProvider>
      </div>
    </main>
  );
}
