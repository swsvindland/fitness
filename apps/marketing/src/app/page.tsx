import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <div className="flex w-full justify-center p-4">
                <div className="container "></div>
            </div>
        </Suspense>
    );
}
