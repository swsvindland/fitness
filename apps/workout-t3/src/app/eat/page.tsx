"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "~/contexts/UserContext";
import { Eat } from "~/app/_components/Macros/Eat";

export default async function EatPage() {
  const queryClient = new QueryClient();

  return (
    <main className="flex min-h-screen flex-col items-center text-secondary">
      <div className="container grid grid-cols-1 gap-2">
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Eat />
          </QueryClientProvider>
        </UserProvider>
      </div>
    </main>
  );
}
