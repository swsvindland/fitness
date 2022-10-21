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
import { format } from 'date-fns';
import { LinkButton } from '../Buttons/LinkButton';
import { getAllUserBloodPressure } from '../../api';
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
                    borderColor: 'rgba(247, 198, 25, 1)',
                    backgroundColor: 'rgba(247, 198, 25, 0.1)',
                },
                {
                    label: 'Diastolic',
                    data:
                        userBloodPressureQuery.data?.data.map(
                            (item) => item.diastolic
                        ) ?? [],
                    borderColor: 'rgba(175, 210, 87, 1)',
                    backgroundColor: 'rgba(175, 210, 87, 0.1)',
                },
            ],
        });
    }, [userBloodPressureQuery.data]);

    if (userBloodPressureQuery.isLoading || !data) {
        return <Loading />;
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
