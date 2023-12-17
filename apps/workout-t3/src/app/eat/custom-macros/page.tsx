import { CustomMacroForm } from '~/app/_components/Macros/CustomMacroForm';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';
import { Suspense } from 'react';

export default async function Page() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <CustomMacroForm />
        </Suspense>
    );
}
