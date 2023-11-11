"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "~/contexts/UserContext";
import { Home } from "~/app/_components/Home/Home";

export default async function HomePage() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </UserProvider>
  );
}
