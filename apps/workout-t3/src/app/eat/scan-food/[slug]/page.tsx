import { ScanFood } from '~/app/_components/Scanner/ScanFood';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

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
