import { Settings } from '~/app/_components/Settings/Settings';
import { LoadingSpinner } from '~/app/_components/Loading/LoadingSpinner';
import { Suspense } from 'react';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Settings />
        </Suspense>
    );
}
