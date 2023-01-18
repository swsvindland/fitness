import { FC } from 'react';
import {
    connectedToHealthOrFit,
    connectToHealthOrFit,
} from '../HealthKitAndGoogleFitInterface/common';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { isPlatform } from '@ionic/react';

export const HealthSetup: FC = () => {
    const connected = useQuery(
        ['ConnectedToHealthOrFit'],
        connectedToHealthOrFit
    );

    if (connected.isLoading) {
        return <Loading />;
    }

    if (connected.data) {
        return null;
    }

    if (isPlatform('desktop') || isPlatform('mobileweb')) {
        return null;
    }

    return (
        <button
            onClick={connectToHealthOrFit}
            className="card p-4 mb-2 w-full flex flex-row justify-between"
        >
            {isPlatform('ios') && !isPlatform('mobileweb') ? (
                <h2 className="text-lg text-ternary">Connect to HealthKit</h2>
            ) : null}
            {isPlatform('android') && !isPlatform('mobileweb') ? (
                <h2 className="text-lg text-ternary">Connect to Google Fit</h2>
            ) : null}
        </button>
    );
};
