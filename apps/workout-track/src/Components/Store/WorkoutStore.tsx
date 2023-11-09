import { FC, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WorkoutStoreCard } from './WorkoutStoreCard';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import {
    getUserWorkouts,
    getWorkouts,
    getWorkoutsByUserId,
} from '@fitness/api-legacy';
import { HeaderContext } from '../Navigation/HeaderContext';
import { AuthContext } from '../Auth/Auth';
import { LinkButton } from '../Buttons/LinkButton';

export const WorkoutStore: FC = () => {
    const { setGoBack } = useContext(HeaderContext);
    const { user } = useContext(AuthContext);
    const workoutsQuery = useQuery(['Workouts'], getWorkouts);
    const customWorkoutsQuery = useQuery(
        ['WorkoutsByUserId', user?.id],
        getWorkoutsByUserId
    );

    const userWorkoutsQuery = useQuery(['UserWorkouts'], getUserWorkouts);

    useEffect(() => {
        if (userWorkoutsQuery.data?.data.length === 0) {
            setGoBack(false);
        } else {
            setGoBack(true);
        }
    });

    if (workoutsQuery.isLoading || customWorkoutsQuery.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container flex flex-col">
            {(customWorkoutsQuery.data?.data.length ?? 0) > 0 && (
                <h2 className="text-secondary text-lg">Your Custom Workouts</h2>
            )}
            <LinkButton to="/workout/create" className="m-4">
                Create New Custom Workout (beta)
            </LinkButton>
            {customWorkoutsQuery.data?.data.map((item) => (
                <WorkoutStoreCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    premium={false}
                    custom={true}
                />
            ))}
            {(customWorkoutsQuery.data?.data.length ?? 0) > 0 && (
                <h2 className="text-secondary text-lg">Workouts</h2>
            )}
            {workoutsQuery.data?.data.map((item) => (
                <WorkoutStoreCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    premium={item.premium}
                    custom={false}
                />
            ))}
        </div>
    );
};
