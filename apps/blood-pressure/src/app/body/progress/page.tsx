import { ProgressGallery } from '~/app/_components/ProgressPhotos/ProgressGallery';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <ProgressGallery />
        </Suspense>
    );
}
