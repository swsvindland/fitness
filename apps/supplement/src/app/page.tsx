import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';
import { Supplements } from '~/app/_components/Supplements/Supplements';

export default async function HomePage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Supplements />
        </Suspense>
    );
}
