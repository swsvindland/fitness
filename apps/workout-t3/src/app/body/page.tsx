import { Body } from '~/app/_components/Body/Body';
import { LoadingSpinner } from '~/app/_components/Loading/LoadingSpinner';
import { Suspense } from 'react';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Body />
        </Suspense>
    );
}
