'use client';

import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserWeights } from '@fitness/api-legacy';
import { LoadingSpinner } from '../../Loading/LoadingSpinner';
import { AllWeightCard } from './AllWeightCard';
import { api } from '~/trpc/react';

export const AllWeights: FC = () => {
    const userWeightQuery = api.body.getAllWeights.useQuery();

    if (userWeightQuery.isLoading) return <LoadingSpinner />;

    return (
        <div className="container grid grid-cols-1">
            <h2 className="text-secondary text-2xl">All Weights</h2>
            <div className=" grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                {userWeightQuery.data?.map((item) => (
                    <AllWeightCard
                        id={Number(item.Id)}
                        date={item.Created.toISOString()}
                        defaultWeight={item.Weight}
                    />
                ))}
            </div>
        </div>
    );
};
