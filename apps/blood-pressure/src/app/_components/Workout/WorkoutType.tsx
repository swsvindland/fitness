import { WorkoutType } from '@fitness/types';
import { WorkoutTypeCard } from '~/app/_components/Workout/WorkoutTypeCard';

export const WorkoutTypes = () => {
    return (
        <ul className="grid w-full grid-cols-1 gap-4">
            <WorkoutTypeCard workoutType={WorkoutType.Resistance} />
            <WorkoutTypeCard workoutType={WorkoutType.Cardio} />
            {/*<WorkoutTypeCard workoutType={WorkoutType.Vo2Max} />*/}
            {/*<WorkoutTypeCard workoutType={WorkoutType.Stability} />*/}
        </ul>
    );
};
