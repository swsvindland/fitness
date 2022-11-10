import { FC } from 'react';
import { BloodPressureGraph } from './BloodPressureGraph';
import { WeightGraph } from './WeightGraph';
import { BodyGraph } from './BodyGraph';
import { BodyFatGraph } from './BodyFatGraph';
import { useHideBackButton } from '../Navigation/headerHooks';

export const Body: FC = () => {
    useHideBackButton();

    return (
        <div className="max-w-2xl w-full">
            <WeightGraph />
            <BodyFatGraph />
            <BodyGraph />
            <BloodPressureGraph />
        </div>
    );
};
