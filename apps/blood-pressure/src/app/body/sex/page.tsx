import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';
import { SexForm } from '~/app/_components/Body/SexForm';

export default async function SexPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <SexForm />
        </Suspense>
    );
}
