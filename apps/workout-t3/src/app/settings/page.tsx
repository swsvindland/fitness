import { Settings } from '~/app/_components/Settings/Settings';
import { Suspense } from 'react';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Settings />
        </Suspense>
    );
}
