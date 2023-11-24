'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '~/contexts/UserContext';
import { Settings } from '~/app/_components/Settings/Settings';

export default async function EatPage() {
    const queryClient = new QueryClient();

    return (
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <Settings />
            </QueryClientProvider>
        </UserProvider>
    );
}
