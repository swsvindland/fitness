import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { getUserWorkouts } from '../../api';
import { useHideBackButton } from '../Navigation/headerHooks';
import { LinkButton } from '../Buttons/LinkButton';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { WorkoutTabs } from '../Workout/WorkoutTabs';
import { DoWorkout } from '../Workout/DoWorkout';
import { WorkoutType } from '../../types/WorkoutType';

export const Cardio: FC = () => {
    useHideBackButton();

    FirebaseAnalytics.setScreenName({
        screenName: 'cardio',
        nameOverride: 'CardioScreen',
    });

    const userWorkoutsQuery = useQuery(['UserWorkouts'], getUserWorkouts);

    if (userWorkoutsQuery.isLoading) {
        return <Loading />;
    }

    const activeWorkouts = userWorkoutsQuery.data?.data.filter(
        (item) => item.active && item.workout?.type === WorkoutType.Cardio
    );

    if (!activeWorkouts || activeWorkouts.length === 0) {
        return (
            <>
                <WorkoutTabs />
                <h2 className="text-ternary">
                    Looks like you haven't started a cardio workout. Select one
                    in the store.
                </h2>
                <LinkButton to="/cardio/store">Cardio Store</LinkButton>
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
