import { IonApp, setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import { Auth } from './Auth/Auth';

import '../index.scss';

setupIonicReact();

export const App: FC = () => {
    const queryClient = new QueryClient();

    return (
        <IonApp>
            <QueryClientProvider client={queryClient}>
                <Auth />
            </QueryClientProvider>
        </IonApp>
    );
};
