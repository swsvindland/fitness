"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "~/contexts/UserContext";
import { Body } from "~/app/_components/Body/Body";

export default async function EatPage() {
  const queryClient = new QueryClient();

  return (
    <main className="flex min-h-screen flex-col items-center text-secondary">
      <div className="container grid grid-cols-1 gap-2">
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Body />
          </QueryClientProvider>
        </UserProvider>
      </div>
    </main>
  );
}
