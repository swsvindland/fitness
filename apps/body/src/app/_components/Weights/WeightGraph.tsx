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
import { LoadingCard } from '@fitness/ui';
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

export const WeightGraph: FC = () => {
    const [data, setData] = useState<
        | ChartData<
              'line',
              (number | ScatterDataPoint | BubbleDataPoint | null)[]
          >
        | undefined
    >(undefined);

    const allHeightsQuery = api.body.getAllWeights.useQuery();

    useMemo(() => {
        const labels = allHeightsQuery.data?.map((item) =>
            format(new Date(item.Created), 'PP')
        );

        setData({
            labels,
            datasets: [
                {
                    label: 'Weight',
                    data:
                        allHeightsQuery.data?.map((item) => item.Weight) ?? [],
                    borderColor: 'rgba(247, 198, 25, 1)',
                    backgroundColor: 'rgba(247, 198, 25, 0.1)',
                },
            ],
        });
    }, [allHeightsQuery.data]);

    if (allHeightsQuery.isLoading || !data) {
        return <LoadingCard isLoading />;
    }

    return (
        <div className="card w-full rounded p-4 shadow">
            {(data.datasets.at(0)?.data.length ?? 0) > 0 ? (
                <Line data={data} />
            ) : (
                <span className="text-ternary">
                    Use the Add button to add your weight
                </span>
            )}
        </div>
    );
};
