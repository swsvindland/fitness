import { ProgressCamera } from '~/app/_components/ProgressPhotos/ProgressCamera';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <ProgressCamera />
        </Suspense>
    );
}
