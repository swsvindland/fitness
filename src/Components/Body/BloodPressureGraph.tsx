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
import { UserBloodPressure } from '../../types/userBloodPressure';
import { format } from 'date-fns';
import { LinkButton } from '../Buttons/LinkButton';

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
    const { user } = useContext(AuthContext);
    const [data, setData] = useState<
        | ChartData<
              'line',
              (number | ScatterDataPoint | BubbleDataPoint | null)[],
              unknown
          >
        | undefined
    >(undefined);

    const getAllUserBloodPressure = (): Promise<
        AxiosResponse<UserBloodPressure[]>
    > => {
        const params = {
            userId: user?.id,
        };

        return axios.get(
            `${process.env.REACT_APP_API_URL}/api/GetUserBloodPressures`,
            { params }
        );
    };

    const userBloodPressureQuery = useQuery(
        ['UserBloodPressure', user?.id],
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
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Diastolic',
                    data:
                        userBloodPressureQuery.data?.data.map(
                            (item) => item.diastolic
                        ) ?? [],
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        });
    }, [userBloodPressureQuery.data]);

    if (userBloodPressureQuery.isLoading || !data) {
        return <span>Loading...</span>;
    }

    return (
        <div className="bg-card rounded shadow p-4 m-4">
            <LinkButton to="/body/blood-pressure" className="float-right">
                Add
            </LinkButton>
            <Line data={data} />
        </div>
    );
};
