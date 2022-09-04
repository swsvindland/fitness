import { FC } from 'react';
import { LinkButton } from '../Components/Buttons/LinkButton';

export const Home: FC = () => {
    return (
        <div className="w-80 grid grid-cols-1">
            <LinkButton
                className="my-2 w-full text-center flex justify-center"
                to="/body/weight"
            >
                Daily Weigh In
            </LinkButton>
            <LinkButton
                className="my-2 w-full text-center flex justify-center"
                to="/workout"
            >
                Start Your Workout
            </LinkButton>
        </div>
    );
};
