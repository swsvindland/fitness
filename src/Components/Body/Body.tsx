import { FC } from 'react';
import { BloodPressureGraph } from './BloodPressure/BloodPressureGraph';
import { WeightGraph } from './Weight/WeightGraph';
import { BodyGraph } from './BodyGraph';
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
        <div className="max-w-2xl w-full grid grid-cols-1">
            <ProgressPhotos />
            <WeightGraph />
            <BodyFatGraph />
            <BodyGraph />
            <BloodPressureGraph />
        </div>
    );
};
