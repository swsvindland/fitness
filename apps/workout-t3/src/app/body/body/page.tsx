import { BodyCheckInForm } from '~/app/_components/Body/Body/BodyCheckInForm';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function EatPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <BodyCheckInForm />
        </Suspense>
    );
}
