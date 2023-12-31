'use client';

import { FC } from 'react';
import { HeightCard } from './HeightCard';
import { api } from '~/trpc/react';
import { LoadingPage } from '@fitness/ui';

export const AllHeights: FC = () => {
    const userBloodPressureQuery = api.body.getAllHeights.useQuery();

    if (userBloodPressureQuery.isLoading) return <LoadingPage />;

    return (
        <div className="container grid grid-cols-1">
            <h2 className="text-secondary text-2xl">All Records</h2>
            <div className=" grid grid-cols-1 gap-2">
                {userBloodPressureQuery.data?.map((item) => (
                    <HeightCard
                        id={Number(item.Id)}
                        date={item.Created.toDateString()}
                        height={item.Height}
                    />
                ))}
            </div>
        </div>
    );
};
