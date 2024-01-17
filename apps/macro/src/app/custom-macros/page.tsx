import { CustomMacroForm } from '~/app/_components/Macros/CustomMacroForm';
import { Suspense } from 'react';
import { LoadingPage } from '@fitness/ui';

export default async function Page() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <CustomMacroForm />
        </Suspense>
    );
}
