import { Body } from '~/app/_components/Body/Body';
import { Suspense } from 'react';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Body />
        </Suspense>
    );
}
