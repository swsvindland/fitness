'use client';

import { WorkoutType } from '@fitness/types';
import { FC } from 'react';
import Link from 'next/link';
import { api } from '~/trpc/react';
import { LoadingCard } from '~/app/_components/Loading/LoadingCard';

interface WorkoutTypeCardProps {
    workoutType: WorkoutType;
}

export const WorkoutTypeCard: FC<WorkoutTypeCardProps> = ({ workoutType }) => {
    const nextWorkout = api.workouts.getNextWorkout.useQuery({
        type: workoutType,
    });

    console.log(nextWorkout.data?.workout);

    if (nextWorkout.isLoading) {
        return <LoadingCard isLoading />;
    }

    return (
        <li
            key={workoutType}
            className="card col-span-1 w-full divide-y divide-gray-200"
        >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <div className="bg-ternary h-12 w-12 rounded-full" />
                        <h3 className="text-secondary truncate text-sm font-medium">
                            {workoutType}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="text-ternary p-4">
                {nextWorkout.data == null ? (
                    <span>
                        No {workoutType} workout selected. Click select workout
                        button to get started.
                    </span>
                ) : (
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
                )}
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
                            {nextWorkout.data == null
                                ? 'Select Workout'
                                : 'Change Workout'}
                        </Link>
                    </div>
                    {nextWorkout.data != null ? (
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
                    ) : null}
                </div>
            </div>
        </li>
    );
};
