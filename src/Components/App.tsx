import { IonApp, setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {FC, useEffect, useState} from 'react';
import { Auth } from './Auth/Auth';

import '../index.css';
import { firebaseConfig } from '../utils/firebase';
import { initializeApp } from 'firebase/app';

setupIonicReact();

export const App: FC = () => {
    const queryClient = new QueryClient();
    const [firebaseEnabled, setFirebaseEnabled] =
        useState<boolean>(false);

    useEffect(() => {
        if (!firebaseEnabled) {
            initializeApp(firebaseConfig);
            setFirebaseEnabled(true);
        }
    }, [firebaseEnabled]);

    return (
        <IonApp>
            <QueryClientProvider client={queryClient}>
                <Auth />
            </QueryClientProvider>
        </IonApp>
    );
};
