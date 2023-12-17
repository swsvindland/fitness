import { Supplements } from '~/app/_components/Supplements/Supplements';
import { Suspense } from 'react';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';

export default async function SupplementsPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Supplements />
        </Suspense>
    );
}
