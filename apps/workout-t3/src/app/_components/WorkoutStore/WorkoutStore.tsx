'use client';

import { FC } from 'react';
import { WorkoutStoreCard } from './WorkoutStoreCard';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { LinkButton } from '../Buttons/LinkButton';
import { api } from '~/trpc/react';
import { WorkoutType } from '@fitness/types';

interface IProps {
    type: WorkoutType;
}

export const WorkoutStore: FC<IProps> = ({ type }) => {
    console.log(type.toString());

    const workoutsQuery = api.store.getWorkouts.useQuery({
        type: type.toString(),
    });
    const customWorkoutsQuery = api.store.getCustomWorkouts.useQuery({
        type: type.toString(),
    });

    if (workoutsQuery.isLoading || customWorkoutsQuery.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container flex flex-col">
            {(customWorkoutsQuery.data?.length ?? 0) > 0 && (
                <h2 className="text-secondary text-lg">Your Custom Workouts</h2>
            )}
            <LinkButton to="/workout/create" className="m-4">
                Create New Custom Workout (beta)
            </LinkButton>
            {customWorkoutsQuery.data?.map((item) => (
                <WorkoutStoreCard
                    key={item.Id}
                    id={item.Id}
                    name={item.Name}
                    custom={true}
                />
            ))}
            {(customWorkoutsQuery.data?.length ?? 0) > 0 && (
                <h2 className="text-secondary text-lg">Workouts</h2>
            )}
            {workoutsQuery.data?.map((item) => (
                <WorkoutStoreCard
                    key={item.Id}
                    id={item.Id}
                    name={item.Name}
                    custom={false}
                />
            ))}
        </div>
    );
};
