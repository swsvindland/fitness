import { FC } from 'react';
import { AvgBloodPressure } from '~/app/_components/Body/AvgBloodPressure';
import { AvgHeatRate } from '~/app/_components/Body/AvgHeatRate';

export const Avg: FC = () => {
    return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <AvgBloodPressure />
            <AvgHeatRate />
        </div>
    );
};
