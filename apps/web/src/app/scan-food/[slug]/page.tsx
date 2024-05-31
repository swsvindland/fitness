import { ScanFood } from '~/app/_components/Scanner/ScanFood';
import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';

export default async function ScanFoodBarcodePage({
    params,
}: {
    params: { slug: string };
}) {
    return (
        <Suspense fallback={<LoadingPage />}>
            <ScanFood barcode={params.slug} />
        </Suspense>
    );
}
