import { AddFood } from '~/app/_components/Food/AddFood';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <AddFood />
        </Suspense>
    );
}
