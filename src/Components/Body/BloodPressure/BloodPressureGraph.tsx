import React, { type FC, useMemo, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    type ChartData,
    type ScatterDataPoint,
    type BubbleDataPoint,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { LinkButton } from '../../Buttons/LinkButton';
import { getAllUserBloodPressure } from '../../../api';
import { LinkSecondaryButton } from '../../Buttons/LinkSecondaryButton';
import { LoadingCard } from '../../Loading/LoadingCard';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const BloodPressureGraph: FC = () => {
    const [data, setData] = useState<
        | ChartData<
              'line',
              (number | ScatterDataPoint | BubbleDataPoint | null)[]
          >
        | undefined
    >(undefined);

    const userBloodPressureQuery = useQuery(
        ['UserBloodPressure'],
        getAllUserBloodPressure
    );

    useMemo(() => {
        const labels = userBloodPressureQuery.data?.data.map((item) =>
            format(new Date(item.created), 'PP')
        );

        setData({
            labels,
            datasets: [
                {
                    label: 'Systolic',
                    data:
                        userBloodPressureQuery.data?.data.map(
                            (item) => item.systolic
                        ) ?? [],
                    borderColor: 'rgba(245, 158, 11, 1)',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                },
                {
                    label: 'Diastolic',
                    data:
                        userBloodPressureQuery.data?.data.map(
                            (item) => item.diastolic
                        ) ?? [],
                    borderColor: 'rgba(20, 184, 166, 1)',
                    backgroundColor: 'rgba(20, 184, 166, 0.1)',
                },
            ],
        });
    }, [userBloodPressureQuery.data]);

    if (userBloodPressureQuery.isLoading || !data) {
        return <LoadingCard isLoading />;
    }

    return (
        <div className="card w-full rounded p-4 shadow">
            <div className="flex flex-row">
                <LinkButton to="body/all-blood-pressure" className="mr-2">
                    See All
                </LinkButton>
                <LinkSecondaryButton to="body/blood-pressure">
                    Add
                </LinkSecondaryButton>
            </div>
            {(data.datasets.at(0)?.data.length ?? 0) > 0 ? (
                <Line data={data} />
            ) : (
                <span className="text-ternary">
                    Use the Add button to add your blood pressure
                </span>
            )}
        </div>
    );
};
