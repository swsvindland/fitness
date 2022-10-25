import { FC } from 'react';
import { BloodPressureGraph } from '../Components/Body/BloodPressureGraph';
import { WeightGraph } from '../Components/Body/WeightGraph';
import { BodyGraph } from '../Components/Body/BodyGraph';
import { BodyFatGraph } from '../Components/Body/BodyFatGraph';
import { useHideBackButton } from '../Components/Navigation/headerHooks';

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
