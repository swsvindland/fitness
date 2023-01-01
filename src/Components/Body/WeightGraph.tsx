import React, { FC, useContext, useMemo, useState } from 'react';
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
import { AuthContext } from '../Auth/Auth';
import { format } from 'date-fns';
import { LinkButton } from '../Buttons/LinkButton';
import { getAllUserWeights } from '../../api';
import { Loading } from '../Loading';

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
    const { user } = useContext(AuthContext);
    const [data, setData] = useState<
        | ChartData<
              'line',
              (number | ScatterDataPoint | BubbleDataPoint | null)[]
          >
        | undefined
    >(undefined);

    const userBloodPressureQuery = useQuery(
        ['UserWeight', user?.id],
        getAllUserWeights
    );

    useMemo(() => {
        const labels = userBloodPressureQuery.data?.data.map((item) =>
            format(new Date(item.created), 'PP')
        );

        setData({
            labels,
            datasets: [
                {
                    label: 'Weights',
                    data:
                        userBloodPressureQuery.data?.data.map(
                            (item) => item.weight
                        ) ?? [],
                    borderColor: 'rgba(247, 198, 25, 1)',
                    backgroundColor: 'rgba(247, 198, 25, 0.1)',
                },
            ],
        });
    }, [userBloodPressureQuery.data]);

    if (userBloodPressureQuery.isLoading || !data) {
        return <Loading />;
    }

    return (
        <div className="card rounded shadow p-4 w-full my-2">
            <LinkButton to="/body/weight" className="relative top-0 right-0">
                Add
            </LinkButton>
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
