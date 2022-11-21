import { Button } from '../Buttons/Button';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { getUserWorkouts, restartWorkout } from '../../api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';

export const RestartWorkout: FC = () => {
    const history = useHistory();

    const userWorkoutsQuery = useQuery(['UserWorkouts'], getUserWorkouts);

    const restartWorkoutMutation = useMutation(restartWorkout, {
        onSuccess: async () => {
            history.push(`/workout`, { replace: true });
        },
    });

    const handleRestartWorkout = async () => {
        const activeWorkouts = userWorkoutsQuery.data?.data.filter(
            (item) => item.active
        );

        if (!activeWorkouts || activeWorkouts.length === 0) {
            history.push('/workout/store', { replace: true });
            return null;
        }

        restartWorkoutMutation.mutate(activeWorkouts[0].workoutId);
    };

    if (userWorkoutsQuery.isLoading || restartWorkoutMutation.isLoading) {
        return <Loading />;
    }

    return (
        <Button className="mb-2" onClick={handleRestartWorkout}>
            Restart Workout
        </Button>
    );
};
