import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { Apps } from '~/app/_components/apps';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <div className="flex w-full justify-center p-4">
                <div className="container">
                    <Apps />
                </div>
            </div>
        </Suspense>
    );
}
