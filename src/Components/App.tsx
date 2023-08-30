import { IonApp, setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, useMemo, useState } from 'react';
import { Auth } from './Auth/Auth';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

import '../index.css';
import { firebaseConfig } from '../utils/firebase';
import { initializeApp } from 'firebase/app';

setupIonicReact();

export const App: FC = () => {
    const queryClient = new QueryClient();
    const [analyticsInitialized, setAnalyticsInitialized] =
        useState<boolean>(false);

    useMemo(() => {
        if (!analyticsInitialized) {
            initializeApp(firebaseConfig);
            FirebaseAnalytics.initializeFirebase(firebaseConfig);
            FirebaseAnalytics.enable();

            setAnalyticsInitialized(true);
        }
    }, [analyticsInitialized]);

    return (
        <IonApp>
            <QueryClientProvider client={queryClient}>
                <Auth />
            </QueryClientProvider>
        </IonApp>
    );
};
