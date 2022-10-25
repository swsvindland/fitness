import { Button } from '../Buttons/Button';
import { FC } from 'react';
import { useHistory } from 'react-router';
import { restartWorkout } from '../../api';
import { useMutation } from '@tanstack/react-query';

interface IProps {
    userId: string;
    workoutId: number;
}

export const WorkoutCompleted: FC<IProps> = ({ userId, workoutId }) => {
    const history = useHistory();

    const restartWorkoutMutation = useMutation(restartWorkout, {
        onSuccess: async () => {
            history.push(`/workout`, { replace: true });
        },
    });

    const handleRestartWorkout = async () => {
        restartWorkoutMutation.mutate(workoutId);
    };

    const handleNewWorkout = () => {
        history.push('/workout/store');
    };

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl text-secondary">Workout Completed</h1>
            <p className="text-md text-ternary">
                Congrats on finishing your workout. You can either restart the
                same workout or choose a new one.
            </p>
            <Button className="my-2" onClick={handleRestartWorkout}>
                Restart Workout
            </Button>
            <Button className="my-2" onClick={handleNewWorkout}>
                Choose New Workout
            </Button>
        </div>
    );
};
