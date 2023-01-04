import { FC } from 'react';
import { BloodPressureGraph } from './BloodPressureGraph';
import { WeightGraph } from './WeightGraph';
import { BodyGraph } from './BodyGraph';
import { BodyFatGraph } from './BodyFatGraph';
import { useHideBackButton } from '../Navigation/headerHooks';
import { Chart as ChartJS } from 'chart.js';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

export const Body: FC = () => {
    useHideBackButton();

    FirebaseAnalytics.setScreenName({
        screenName: 'body',
        nameOverride: 'BodyScreen',
    });

    return (
        <div className="max-w-2xl w-full grid grid-cols-1">
            <WeightGraph />
            <BodyFatGraph />
            <BodyGraph />
            <BloodPressureGraph />
        </div>
    );
};
