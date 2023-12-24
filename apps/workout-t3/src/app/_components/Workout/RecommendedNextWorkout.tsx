'use client';

import { FC } from 'react';
import { api } from '~/trpc/react';
import { LoadingCard } from '~/app/_components/Loading/LoadingCard';
import Link from 'next/link';

export const RecommendedNextWorkout: FC = () => {
    const workout = api.dashboard.getRecommendedNextWorkout.useQuery();
    const nextWorkout = api.workouts.getNextWorkout.useQuery(
        {
            type: workout.data?.Workout.Type ?? '',
        },
        { enabled: !!workout.data }
    );

    if (workout.isLoading) {
        return <LoadingCard isLoading />;
    }

    if (!workout.data) {
        return (
            <div className="card col-span-1 w-full divide-y divide-gray-200">
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                    <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                            <h3 className="text-secondary text-lg">
                                Recommended Next Workout
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="h-[65%] min-h-[220px] p-4">
                    <p className="text-ternary">
                        You don't have a workout selected. Please select a new
                        workout.
                    </p>
                </div>
                <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="flex w-0 flex-1">
                            <Link
                                href={`/workout`}
                                className="text-ternary relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm"
                            >
                                Select Workout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const workoutType = workout.data?.Workout.Type ?? '';

    return (
        <div className="card col-span-1 w-full divide-y divide-gray-200">
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
                <div>
                    <h4 className="text-secondary">
                        {nextWorkout.data?.workout?.Name}
                    </h4>
                    <span>
                        Day {nextWorkout.data?.day} of{' '}
                        {nextWorkout.data?.workout?.Days}
                    </span>
                    <br />
                    <span>
                        Week {nextWorkout.data?.week} of{' '}
                        {nextWorkout.data?.workout?.Duration}
                    </span>
                </div>
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
