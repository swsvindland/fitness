'use client';

import React, { useMemo, useState } from 'react';
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
import { format } from 'date-fns';
import { LinkButton } from '../../Buttons/LinkButton';
import { LinkSecondaryButton } from '../../Buttons/LinkSecondaryButton';
import { LoadingCard } from '../../Loading/LoadingCard';
import { api } from '~/trpc/react';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const BodyGraph = () => {
    const [data, setData] = useState<
        | ChartData<
              'radar',
              (number | ScatterDataPoint | BubbleDataPoint | null)[],
              unknown
          >
        | undefined
    >(undefined);

    const userBodyQuery = api.body.getAllBodies.useQuery();

    useMemo(() => {
        const userBody = userBodyQuery.data ?? [];

        if (!userBody) {
            return;
        }

        let graphedData = [];
        if (userBody?.length > 3) {
            graphedData.push(userBody[0]);
            graphedData.push(userBody[Math.floor(userBody.length / 2)]);
            graphedData.push(userBody[userBody.length - 1]);
        } else {
            graphedData = userBody;
        }

        const backgrounds = [
            'rgba(40, 130, 122, 0.2)',
            'rgba(175, 210, 87, 0.2)',
            'rgba(247, 198, 25, 0.2)',
        ];
        const colors = ['#28827A', '#AFD257', '#F7C619'];

        const normalizedData = graphedData[0];

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
                graphedData.map((item, index) => ({
                    label: format(new Date(item!.Created ?? ''), 'PP'),
                    data: [
                        item!.Neck / normalizedData!.Neck,
                        item!.Shoulders / normalizedData!.Shoulders,
                        item!.Chest / normalizedData!.Chest,
                        item!.LeftBicep / normalizedData!.LeftBicep,
                        item!.RightBicep / normalizedData!.RightBicep,
                        item!.Navel / normalizedData!.Navel,
                        item!.Waist / normalizedData!.Waist,
                        item!.Hip / normalizedData!.Hip,
                        item!.LeftThigh / normalizedData!.LeftThigh,
                        item!.RightThigh / normalizedData!.RightThigh,
                        item!.LeftCalf / normalizedData!.LeftCalf,
                        item!.RightCalf / normalizedData!.RightCalf,
                    ],
                    backgroundColor: backgrounds[index],
                    borderColor: colors[index],
                    borderWidth: 1,
                })) ?? [],
        });
    }, [userBodyQuery.data]);

    if (userBodyQuery.isLoading || !data) {
        return <LoadingCard isLoading />;
    }

    return (
        <div className="card w-full rounded p-4 shadow">
            <div className="flex flex-row">
                <LinkButton to="body/body/all" className="mr-2">
                    See All
                </LinkButton>
                <LinkSecondaryButton to="body/body">Add</LinkSecondaryButton>
            </div>
            {data.datasets.length > 0 ? (
                <Radar data={data} />
            ) : (
                <span className="text-ternary">
                    Use the Add button to add body measurements
                </span>
            )}
        </div>
    );
};
