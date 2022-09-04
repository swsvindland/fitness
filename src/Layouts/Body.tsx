import { FC } from 'react';
import { BloodPressureGraph } from '../Components/Body/BloodPressureGraph';
import { WeightGraph } from '../Components/Body/WeightGraph';
import { BodyGraph } from '../Components/Body/BodyGraph';

export const Body: FC = () => {
    return (
        <div className="max-w-2xl w-full">
            <WeightGraph />
            <BodyGraph />
            <BloodPressureGraph />
        </div>
    );
};
