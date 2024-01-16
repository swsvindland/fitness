import { SignUp } from '@clerk/nextjs';
import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';

export default function Page() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <main className="text-secondary flex min-h-screen flex-col items-center justify-center">
                <SignUp />
            </main>
        </Suspense>
    );
}
