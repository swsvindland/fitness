import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <h1>Home</h1>
        </Suspense>
    );
}
