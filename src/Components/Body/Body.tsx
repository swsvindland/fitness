import { FC } from 'react';
import { BloodPressureGraph } from './BloodPressureGraph';
import { WeightGraph } from './WeightGraph';
import { BodyGraph } from './BodyGraph';
import { BodyFatGraph } from './BodyFatGraph';
import { useHideBackButton } from '../Navigation/headerHooks';
import { Chart as ChartJS } from 'chart.js';

export const Body: FC = () => {
    useHideBackButton();

    ChartJS.defaults.color = '#AFD257';
    ChartJS.defaults.font.family = "'Oswald', 'sans-serif'";
    ChartJS.defaults.font.size = 10;

    return (
        <div className="max-w-2xl w-full">
            <WeightGraph />
            <BodyFatGraph />
            <BodyGraph />
            <BloodPressureGraph />
        </div>
    );
};
