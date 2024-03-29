import { FC } from 'react';
import { LinkButton } from '../Buttons/LinkButton';

export const WorkoutCompleted: FC = () => {
    return (
        <div className="flex flex-col">
            <h1 className="text-secondary text-2xl">Workout Completed</h1>
            <p className="text-md text-ternary">
                Congrats on finishing your workout. You can either restart the
                same workout or choose a new one.
            </p>
            <LinkButton to="/workout/store" className="my-2">
                Select a New Workout
            </LinkButton>
        </div>
    );
};
