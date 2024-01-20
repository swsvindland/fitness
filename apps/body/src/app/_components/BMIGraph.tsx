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
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const BMIGraph: FC = () => {
    const [data, setData] = useState<
        | ChartData<
              'line',
              (number | ScatterDataPoint | BubbleDataPoint | null)[]
          >
        | undefined
    >(undefined);

    const allBMIQuery = api.body.getAllBMI.useQuery();

    useMemo(() => {
        const labels = allBMIQuery.data?.map((item) =>
            format(new Date(item.created), 'PP')
        );

        setData({
            labels,
            datasets: [
                {
                    label: 'BMI',
                    data: allBMIQuery.data?.map((item) => item.bmi) ?? [],
                    borderColor: 'rgba(247, 198, 25, 1)',
                    backgroundColor: 'rgba(247, 198, 25, 0.1)',
                },
            ],
        });
    }, [allBMIQuery.data]);

    if (allBMIQuery.isLoading || !data) {
        return <LoadingCard isLoading />;
    }

    return (
        <Card>
            <CardHeader>BMI</CardHeader>
            <Divider />
            <CardBody>
                {(data.datasets.at(0)?.data.length ?? 0) > 0 ? (
                    <Line data={data} />
                ) : (
                    <span className="text-ternary">
                        Add your height and weight to see your BMI.
                    </span>
                )}
            </CardBody>
        </Card>
    );
};
