import { FC } from 'react';
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
    });

    return (
        <div className="container grid grid-cols-1 gap-2">
            <ProgressPhotos />
            <WeightGraph />
            <BodyFatGraph />
            <BodyGraph />
            <BloodPressureGraph />
        </div>
    );
};
