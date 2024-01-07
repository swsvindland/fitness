'use client';

import { FC } from 'react';
import { WeightCard } from './WeightCard';
import { api } from '~/trpc/react';
import { LoadingPage } from '@fitness/ui';
import { CreateWeight } from '~/app/_components/Weights/CreateWeight';

export const AllWeights: FC = () => {
    const userBloodPressureQuery = api.body.getAllWeights.useQuery();

    if (userBloodPressureQuery.isLoading) return <LoadingPage />;

    return (
        <div className="container grid grid-cols-1">
            <div className=" grid grid-cols-1 gap-2">
                {userBloodPressureQuery.data?.map((item) => (
                    <WeightCard
                        id={Number(item.Id)}
                        date={item.Created.toDateString()}
                        weight={item.Weight}
                    />
                ))}
            </div>
            <CreateWeight />
        </div>
    );
};
