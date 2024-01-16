import { AddFood } from '~/app/_components/Food/AddFood';
import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AddFood />
        </Suspense>
    );
}
