'use client';

import { FC } from 'react';
import { LoadingSpinner } from '../../Loading/LoadingSpinner';
import { AllBloodPressureCard } from './AllBloodPressureCard';
import { api } from '~/trpc/react';

export const AllBloodPressure: FC = () => {
    const userBloodPressureQuery = api.body.getAllBloodPressures.useQuery();

    if (userBloodPressureQuery.isLoading) return <LoadingSpinner />;

    return (
        <div className="container grid grid-cols-1">
            <h2 className="text-secondary text-2xl">
                All Blood Pressure Records
            </h2>
            <div className=" grid grid-cols-1 gap-2">
                {userBloodPressureQuery.data?.map((item) => (
                    <AllBloodPressureCard
                        id={Number(item.Id)}
                        date={item.Created.toDateString()}
                        defaultSystolic={item.Systolic}
                        defaultDiastolic={item.Diastolic}
                    />
                ))}
            </div>
        </div>
    );
};
