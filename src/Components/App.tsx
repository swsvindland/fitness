import { IonApp, setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import { Auth } from './Auth/Auth';
import { AdMob } from '@capacitor-community/admob';

import '../index.css';

setupIonicReact();

export const App: FC = () => {
    const queryClient = new QueryClient();

    AdMob.initialize({
        requestTrackingAuthorization: true,
    });

    return (
        <IonApp>
            <QueryClientProvider client={queryClient}>
                <Auth />
            </QueryClientProvider>
        </IonApp>
    );
};
