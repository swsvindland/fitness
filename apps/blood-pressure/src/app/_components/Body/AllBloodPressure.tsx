'use client';

import { FC } from 'react';
import { BloodPressureCard } from './BloodPressureCard';
import { api } from '~/trpc/react';
import { LoadingPage } from '@fitness/ui';

export const AllBloodPressure: FC = () => {
    const userBloodPressureQuery = api.body.getAllBloodPressures.useQuery();

    if (userBloodPressureQuery.isLoading) return <LoadingPage />;

    return (
        <div className="container grid grid-cols-1">
            <h2 className="text-secondary text-2xl">All Records</h2>
            <div className=" grid grid-cols-1 gap-2">
                {userBloodPressureQuery.data?.map((item) => (
                    <BloodPressureCard
                        id={Number(item.Id)}
                        date={item.Created.toDateString()}
                        systolic={item.Systolic}
                        diastolic={item.Diastolic}
                        heartRate={item.HeartRate}
                    />
                ))}
            </div>
        </div>
    );
};
