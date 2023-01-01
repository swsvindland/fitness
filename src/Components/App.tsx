import { IonApp, setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, useMemo, useState } from 'react';
import { Auth } from './Auth/Auth';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

import '../index.css';

setupIonicReact();

const firebaseConfig = {
    apiKey: 'AIzaSyB8hv3LRia0DArtg9o4Mq3wZJEHvyZxwog',
    authDomain: 'lifttrack-b8673.firebaseapp.com',
    projectId: 'lifttrack-b8673',
    storageBucket: 'lifttrack-b8673.appspot.com',
    messagingSenderId: '857870999277',
    appId: '1:857870999277:web:1ffbb703370f977714b6e4',
    measurementId: 'G-SN0LHF572Z',
};

export const App: FC = () => {
    const queryClient = new QueryClient();
    const [analyticsInitialized, setAnalyticsInitialized] =
        useState<boolean>(false);

    useMemo(() => {
        if (!analyticsInitialized) {
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
