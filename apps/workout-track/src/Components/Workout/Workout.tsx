import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { DoWorkout } from './DoWorkout';
import { getUserWorkouts } from '@fitness/api-legacy';
import { useHideBackButton } from '../Navigation/headerHooks';
import { LinkButton } from '../Buttons/LinkButton';

export const Workout: FC = () => {
    useHideBackButton();

    const userWorkoutsQuery = useQuery(['UserWorkouts'], getUserWorkouts);

    if (userWorkoutsQuery.isLoading) {
        return <LoadingSpinner />;
    }

    const activeWorkouts = userWorkoutsQuery.data?.data.filter(
        (item) => item.active
    );

    if (!activeWorkouts || activeWorkouts.length === 0) {
        return (
            <>
                <h2 className="text-ternary">
                    Looks like you haven't started a workout. Select one in the
                    store.
                </h2>
                <LinkButton to="/workout/store">Workout Store</LinkButton>
            </>
        );
    }

    return <DoWorkout workoutId={activeWorkouts[0].workoutId} />;
};
