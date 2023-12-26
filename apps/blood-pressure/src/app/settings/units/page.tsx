import { Suspense } from 'react';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { UnitsForm } from '~/app/_components/Settings/UnitsForm';

export default async function UnitsPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <UnitsForm />
        </Suspense>
    );
}
