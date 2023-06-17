import { IonApp, setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type FC, useMemo, useState } from 'react';
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
            FirebaseAnalytics.initializeFirebase(firebaseConfig).catch((err) =>
                console.error(err)
            );
            FirebaseAnalytics.enable().catch((err) => console.error(err));

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
