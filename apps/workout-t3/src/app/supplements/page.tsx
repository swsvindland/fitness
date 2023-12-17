import { Supplements } from '~/app/_components/Supplements/Supplements';
import { LoadingSpinner } from '~/app/_components/Loading/LoadingSpinner';
import { Suspense } from 'react';

export default async function SupplementsPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Supplements />
        </Suspense>
    );
}
