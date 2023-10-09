import { FC } from 'react';
import { BloodPressureGraph } from './BloodPressure/BloodPressureGraph';
import { useHideBackButton } from '../Navigation/headerHooks';

export const Body: FC = () => {
    useHideBackButton();

    return (
        <div className="container grid grid-cols-1 gap-2">
            <BloodPressureGraph />
        </div>
    );
};
