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
import { AuthContext } from '../../Auth/Auth';
import axios, { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import { UserWeight } from '../../types/userWeight';
import { LinkButton } from '../Buttons/LinkButton';
import { API_URL } from '../../api';
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
              (number | ScatterDataPoint | BubbleDataPoint | null)[],
              unknown
          >
        | undefined
    >(undefined);

    const getAllUserWeights = (): Promise<AxiosResponse<UserWeight[]>> => {
        const params = {
            userId: user?.id,
        };

        return axios.get(`${API_URL}/api/GetUserWeights`, {
            params,
        });
    };

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
            <LinkButton to="/body/weight" className="float-right">
                Add
            </LinkButton>
            <Line options={options} data={data} />
        </div>
    );
};
