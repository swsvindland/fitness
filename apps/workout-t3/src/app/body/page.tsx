'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '~/contexts/UserContext';
import { Body } from '~/app/_components/Body/Body';

export default async function EatPage() {
    const queryClient = new QueryClient();

    return (
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <Body />
            </QueryClientProvider>
        </UserProvider>
    );
}
