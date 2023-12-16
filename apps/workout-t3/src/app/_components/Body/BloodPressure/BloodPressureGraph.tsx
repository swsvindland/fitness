'use client';

import { FC, useMemo, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ScatterDataPoint,
    BubbleDataPoint,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { LinkButton } from '../../Buttons/LinkButton';
import { LinkSecondaryButton } from '../../Buttons/LinkSecondaryButton';
import { LoadingCard } from '../../Loading/LoadingCard';
import { api } from '~/trpc/react';

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

    const userBloodPressureQuery = api.body.getAllBloodPressures.useQuery();

    useMemo(() => {
        const labels = userBloodPressureQuery.data?.map((item) =>
            format(new Date(item.Created), 'PP')
        );

        setData({
            labels,
            datasets: [
                {
                    label: 'Systolic',
                    data:
                        userBloodPressureQuery.data?.map(
                            (item) => item.Systolic
                        ) ?? [],
                    borderColor: 'rgba(247, 198, 25, 1)',
                    backgroundColor: 'rgba(247, 198, 25, 0.1)',
                },
                {
                    label: 'Diastolic',
                    data:
                        userBloodPressureQuery.data?.map(
                            (item) => item.Diastolic
                        ) ?? [],
                    borderColor: 'rgba(175, 210, 87, 1)',
                    backgroundColor: 'rgba(175, 210, 87, 0.1)',
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
