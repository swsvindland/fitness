'use client';

import { FC } from 'react';
import { DoWorkout } from './DoWorkout';
import { LinkButton } from '../Buttons/LinkButton';
import { WorkoutType } from '@fitness/types';
import { api } from '~/trpc/react';
import { LoadingPage } from '~/app/_components/Loading/LoadingPage';

interface IProps {
    type: WorkoutType;
}

export const Workout: FC<IProps> = ({ type }) => {
    const userWorkoutsQuery = api.workouts.getActiveUserWorkouts.useQuery({
        type: type.toString(),
    });

    if (userWorkoutsQuery.isLoading) {
        return <LoadingPage />;
    }

    if (!userWorkoutsQuery.data || userWorkoutsQuery.data?.length === 0) {
        return (
            <>
                <h2 className="text-ternary">
                    Looks like you haven't started a workout. Select one in the
                    store.
                </h2>
                <LinkButton
                    to={`/workout/store/${type.toString().toLowerCase()}`}
                >
                    Workout Store
                </LinkButton>
            </>
        );
    }

    return (
        <DoWorkout
            workoutId={userWorkoutsQuery.data[0]!.WorkoutId}
            type={type}
        />
    );
};
