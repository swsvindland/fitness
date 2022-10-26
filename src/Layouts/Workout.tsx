import { FC, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { Loading } from '../Components/Loading';
import { DoWorkout } from '../Components/Workout/DoWorkout';
import { useHistory } from 'react-router';
import { getUserWorkouts } from '../api';
import { useHideBackButton } from '../Components/Navigation/headerHooks';

export const Workout: FC = () => {
    const { user } = useContext(AuthContext);
    useHideBackButton();
    const history = useHistory();

    const userWorkoutsQuery = useQuery(
        ['UserWorkouts', user?.id],
        getUserWorkouts
    );

    if (userWorkoutsQuery.isLoading) {
        return <Loading />;
    }

    const activeWorkouts = userWorkoutsQuery.data?.data.filter(
        (item) => item.active
    );

    if (!activeWorkouts || activeWorkouts.length === 0) {
        history.push('/workout/store', { replace: true });
        return null;
    }

    return (
        <>
            <DoWorkout workoutId={activeWorkouts[0].workoutId} />
        </>
    );
};
