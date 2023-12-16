'use client';

import { FC } from 'react';
import { LoadingSpinner } from '../../Loading/LoadingSpinner';
import { AllBodyCard } from './AllBodyCard';
import { api } from '~/trpc/react';

export const AllBody: FC = () => {
    const userBodiesQuery = api.body.getAllBodies.useQuery();

    if (userBodiesQuery.isLoading) return <LoadingSpinner />;

    return (
        <div className="container grid grid-cols-1">
            <h2 className="text-secondary text-2xl">All Body Records</h2>
            <div className=" grid grid-cols-1 gap-2">
                {userBodiesQuery.data?.map((item) => (
                    <AllBodyCard
                        id={Number(item.Id)}
                        date={item.Created.toISOString()}
                        neck={item.Neck}
                        shoulders={item.Shoulders}
                        chest={item.Chest}
                        leftBicep={item.LeftBicep}
                        rightBicep={item.RightBicep}
                        navel={item.Navel}
                        waist={item.Waist}
                        hip={item.Hip}
                        leftThigh={item.LeftThigh}
                        rightThigh={item.RightThigh}
                        leftCalf={item.LeftCalf}
                        rightCalf={item.RightCalf}
                    />
                ))}
            </div>
        </div>
    );
};
