import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { DoWorkout } from './DoWorkout';
import { getUserWorkouts } from '../../api';
import { useHideBackButton } from '../Navigation/headerHooks';
import { LinkButton } from '../Buttons/LinkButton';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { WorkoutTabs } from './WorkoutTabs';
import { WorkoutType } from '../../types/WorkoutType';

export const Workout: FC = () => {
    useHideBackButton();

    FirebaseAnalytics.setScreenName({
        screenName: 'workout',
        nameOverride: 'WorkoutScreen',
    });

    const userWorkoutsQuery = useQuery(['UserWorkouts'], getUserWorkouts);

    if (userWorkoutsQuery.isLoading) {
        return <Loading />;
    }

    const activeWorkouts = userWorkoutsQuery.data?.data.filter(
        (item) =>
            item.active &&
            (item.workout?.type === WorkoutType.Unknown ||
                item.workout?.type === WorkoutType.Resistance)
    );

    if (!activeWorkouts || activeWorkouts.length === 0) {
        return (
            <>
                <WorkoutTabs />
                <h2 className="text-ternary">
                    Looks like you haven't started a workout. Select one in the
                    store.
                </h2>
                <LinkButton to="/workout/store">Workout Store</LinkButton>
            </>
        );
    }

    return (
        <>
            <WorkoutTabs />
            <DoWorkout workoutId={activeWorkouts[0].workoutId} />
        </>
    );
};
