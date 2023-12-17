import { Eat } from '~/app/_components/Macros/Eat';
import { LoadingSpinner } from '~/app/_components/Loading/LoadingSpinner';
import { Suspense } from 'react';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Eat />
        </Suspense>
    );
}
