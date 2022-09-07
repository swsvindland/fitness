import React, { useContext, useMemo, useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartData,
    ScatterDataPoint,
    BubbleDataPoint,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { AuthContext } from '../../Auth/Auth';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { UserBody } from '../../types/userBody';
import { format } from 'date-fns';
import { LinkButton } from '../Buttons/LinkButton';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const BodyGraph = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState<
        | ChartData<
              'radar',
              (number | ScatterDataPoint | BubbleDataPoint | null)[],
              unknown
          >
        | undefined
    >(undefined);

    const getAllUserBodies = (): Promise<AxiosResponse<UserBody[]>> => {
        const params = {
            userId: user?.id,
        };

        return axios.get(`${process.env.REACT_APP_API_URL}/api/GetUserBodies`, {
            params,
        });
    };

    const userBodyQuery = useQuery(['UserBody', user?.id], getAllUserBodies);

    useMemo(() => {
        setData({
            labels: [
                'Neck',
                'Shoulders',
                'Chest',
                'Left Bicep',
                'Right Bicep',
                'Navel',
                'Waist',
                'Hip',
                'Left Thigh',
                'Right Thigh',
                'Left Calf',
                'Right Calf',
            ],
            datasets:
                userBodyQuery.data?.data.map((item, index) => ({
                    label: format(new Date(item.created), 'PP'),
                    data: [
                        item.neck,
                        item.shoulders,
                        item.chest,
                        item.leftBicep,
                        item.rightBicep,
                        item.navel,
                        item.waist,
                        item.hip,
                        item.leftThigh,
                        item.rightThigh,
                        item.leftCalf,
                        item.rightCalf,
                    ],
                    backgroundColor: `rgba(247, 198, 25, ${(index + 1) * 0.1})`,
                    borderColor: `rgba(247, 198, 25, 1)`,
                    borderWidth: 1,
                })) ?? [],
        });
    }, [userBodyQuery.data]);

    if (userBodyQuery.isLoading || !data) {
        return <span>Loading...</span>;
    }

    return (
        <div className="bg-card rounded shadow p-4 m-4">
            <LinkButton to="/body/body" className="float-right">
                Add
            </LinkButton>
            <Radar data={data} />
        </div>
    );
};
