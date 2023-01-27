import React, { FC, useMemo, useState } from 'react';
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
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Loading } from '../Loading';
import { getUserBodyFat } from '../../api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const BodyFatGraph: FC = () => {
    const [data, setData] = useState<
        | ChartData<
              'line',
              (number | ScatterDataPoint | BubbleDataPoint | null)[]
          >
        | undefined
    >(undefined);

    const userBodyFatQuery = useQuery(['UserBodyFat'], () => {
        return getUserBodyFat();
    });

    useMemo(() => {
        const labels = userBodyFatQuery.data?.data?.map((item) =>
            format(new Date(item.created), 'PP')
        );

        setData({
            labels,
            datasets: [
                {
                    label: 'Body Fat',
                    data:
                        userBodyFatQuery.data?.data?.map(
                            (item) => item.bodyFat
                        ) ?? [],
                    borderColor: 'rgba(247, 198, 25, 1)',
                    backgroundColor: 'rgba(247, 198, 25, 0.1)',
                },
            ],
        });
    }, [userBodyFatQuery.data]);

    if (userBodyFatQuery.isLoading) {
        return <Loading />;
    }

    if (!data) {
        return null;
    }

    return (
        <div className="card my-2 w-full rounded p-4 shadow">
            {(data.datasets.at(0)?.data.length ?? 0) > 0 ? (
                <Line data={data} />
            ) : (
                <span className="text-ternary">
                    Add your weight, height, and body measurements to compute
                    your body fat. This is also needed for accurate macros and
                    calories.
                </span>
            )}
        </div>
    );
};
