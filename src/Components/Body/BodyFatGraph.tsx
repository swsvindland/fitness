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

    const options = {
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        family: 'Quicksand',
                        size: 12,
                        color: 'blue',
                    },
                },
            },
        },
    };

    return (
        <div className="bg-card rounded shadow p-4 m-4">
            <Line options={options} data={data} />
        </div>
    );
};
