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
            className="card p-4 my-2 w-full flex flex-row justify-between"
        >
            {isPlatform('ios') ? (
                <>
                    <h2 className="text-lg text-ternary">
                        Connect to HealthKit
                    </h2>
                    <img
                        className="w-8 h-8"
                        src="https://firebasestorage.googleapis.com/v0/b/lifttrack-b8673.appspot.com/o/Icon%20-%20Apple%20Health.png?alt=media"
                        alt="HealthKit logo"
                    />
                </>
            ) : null}
            {/*{isPlatform('android') ? (*/}
            {/*    <>*/}
            {/*        <h2 className="text-lg text-ternary">*/}
            {/*            Connect to Google Fit*/}
            {/*        </h2>*/}
            {/*        <img*/}
            {/*            className="w-8 h-8"*/}
            {/*            src="https://firebasestorage.googleapis.com/v0/b/lifttrack-b8673.appspot.com/o/gfit_512dp.png?alt=media"*/}
            {/*            alt="Google Fit logo"*/}
            {/*        />*/}
            {/*    </>*/}
            {/*) : null}*/}
        </button>
    );
};
