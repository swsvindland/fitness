import { FC } from 'react';
import { getSteps } from '../HealthKitAndGoogleFitInterface/common';
import { useQuery } from '@tanstack/react-query';

export const Pedometer: FC = () => {
    const goal = 10000;

    const stepsQuery = useQuery(['Steps'], getSteps);

    const percentage = ((stepsQuery.data ?? 0) / goal) * 100;

    return (
        <div className="card p-4 w-full">
            <h2 className="text-lg text-secondary">Pedometer</h2>
            <div className="relative mt-4">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-secondary-light shadow-inner">
                    <div
                        style={{
                            width: `${percentage}%`,
                        }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center shadow-inner ${
                            percentage < 100 ? 'bg-secondary' : 'bg-primary'
                        }`}
                    ></div>
                </div>
            </div>
        </div>
    );
};
