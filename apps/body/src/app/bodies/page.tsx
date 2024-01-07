import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';

export default async function AllPage() {
    return <Suspense fallback={<LoadingPage />}></Suspense>;
}
