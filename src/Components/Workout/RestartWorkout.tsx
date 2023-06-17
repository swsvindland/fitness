import { Button } from '../Buttons/Button';
import { type FC } from 'react';
import { useHistory } from 'react-router-dom';
import { getUserWorkouts, restartWorkout } from '../../api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '../Loading/LoadingSpinner';

export const RestartWorkout: FC = () => {
    const history = useHistory();

    const userWorkoutsQuery = useQuery(['UserWorkouts'], getUserWorkouts);

    const restartWorkoutMutation = useMutation(restartWorkout, {
        onSuccess: () => {
            history.push(`/workout`, { replace: true });
        },
    });

    const handleRestartWorkout = () => {
        const activeWorkouts = userWorkoutsQuery.data?.data.filter(
            (item) => item.active
        );

        if (!activeWorkouts || activeWorkouts.length === 0) {
            history.push('/workout/store', { replace: true });
            return null;
        }

        restartWorkoutMutation.mutate(activeWorkouts?.at(0)?.workoutId ?? 0);
    };

    if (userWorkoutsQuery.isLoading || restartWorkoutMutation.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Button className="mb-2" onClick={handleRestartWorkout}>
            Restart Workout
        </Button>
    );
};
