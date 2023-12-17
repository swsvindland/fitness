import { SignIn } from '@clerk/nextjs';
import { LoadingSpinner } from '~/app/_components/Loading/LoadingSpinner';
import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <main className="text-secondary flex min-h-screen flex-col items-center justify-center">
                <SignIn />
            </main>
        </Suspense>
    );
}
