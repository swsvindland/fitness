import { Button } from '../Buttons/Button';
import { FC } from 'react';
import { useHistory } from 'react-router';

export const WorkoutCompleted: FC = () => {
    const history = useHistory();

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
            <Button className="my-2">Restart Workout</Button>
            <Button className="my-2" onClick={handleNewWorkout}>
                Choose New Workout
            </Button>
        </div>
    );
};
