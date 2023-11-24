'use client';

import { FC } from 'react';
import { api } from '~/trpc/react';
import { LoadingCard } from '~/app/_components/Loading/LoadingCard';
import Link from 'next/link';
import { WorkoutType } from '@fitness/types';

export const RecommendedNextWorkout: FC = () => {
    const workout = api.dashboard.getRecommendedNextWorkout.useQuery();

    if (workout.isLoading) {
        return <LoadingCard isLoading />;
    }

    const workoutType = WorkoutType.Resistance;

    return (
        <div
            key={workoutType}
            className="card col-span-1 w-full divide-y divide-gray-200"
        >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-secondary text-lg">
                            Recommended Next Workout
                        </h3>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <p className="text-ternary">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Debitis eveniet magnam necessitatibus obcaecati voluptas
                    voluptatem! Alias architecto at cum deserunt laborum libero
                    sint sit.
                </p>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                        <Link
                            href={`/workout/store/${workoutType
                                .toString()
                                .toLowerCase()}`}
                            className="text-ternary relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm"
                        >
                            Change Workout
                        </Link>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                        <Link
                            href={`/workout/${workoutType
                                .toString()
                                .toLowerCase()}`}
                            className="text-ternary relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm"
                        >
                            Start Workout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
