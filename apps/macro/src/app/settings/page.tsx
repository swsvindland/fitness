import { Settings } from '~/app/_components/Settings/Settings';
import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';

export default async function SettingsPage() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Settings />
        </Suspense>
    );
}
