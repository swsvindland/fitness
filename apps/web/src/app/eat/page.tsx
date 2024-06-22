import { Eat } from '~/app/_components/Macros/Eat';
import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Eat />
        </Suspense>
    );
}
