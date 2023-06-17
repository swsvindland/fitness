import { type FC } from 'react';
import { BloodPressureGraph } from './BloodPressure/BloodPressureGraph';
import { WeightGraph } from './Weight/WeightGraph';
import { BodyGraph } from './Body/BodyGraph';
import { BodyFatGraph } from './BodyFatGraph';
import { useHideBackButton } from '../Navigation/headerHooks';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { ProgressPhotos } from '../ProgressPhotos/ProgressPhotos';

export const Body: FC = () => {
    useHideBackButton();

    FirebaseAnalytics.setScreenName({
        screenName: 'body',
        nameOverride: 'BodyScreen',
    }).catch((err) => console.error(err));

    return (
        <div className="container grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
            <ProgressPhotos />
            <WeightGraph />
            <BodyFatGraph />
            <BodyGraph />
            <BloodPressureGraph />
        </div>
    );
};
