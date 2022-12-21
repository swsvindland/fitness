import { FC, useContext } from 'react';
import { WorkoutSet } from './WorkoutSet';
import { WorkoutExercise } from '../../types/WorkoutExercise';
import { ExerciseIcon } from '../../types/Exercise';
import { Barbell } from '../Icons/Barbell';
import { Dumbbell } from '../Icons/Dumbbell';
import { AuthContext } from '../Auth/Auth';
import { Cardio } from '../Icons/Cardio';
import { Cable } from '../Icons/Cable';
import { BodyWeight } from '../Icons/BodyWeight';
import { Band } from '../Icons/Band';
import { Machine } from '../Icons/Machine';

interface IProps {
    exercise: WorkoutExercise;
    week: number;
    day: number;
    icon?: ExerciseIcon;
}

const mapToIcon = (icon?: ExerciseIcon) => {
    switch (icon) {
        case ExerciseIcon.Barbell:
            return <Barbell className="fill-primary-dark w-8" />;
        case ExerciseIcon.Dumbbell:
            return <Dumbbell className="fill-primary-dark w-8" />;
        case ExerciseIcon.Cable:
            return <Cable className="fill-primary-dark w-8" />;
        case ExerciseIcon.Bodyweight:
            return <BodyWeight className="fill-primary-dark w-8" />;
        case ExerciseIcon.Band:
            return <Band className="fill-primary-dark w-8" />;
        case ExerciseIcon.Machine:
            return <Machine className="fill-primary-dark w-8" />;
        case ExerciseIcon.Cardio:
            return <Cardio className="fill-primary-dark w-8" />;
        default:
            return <></>;
    }
};

export const WorkoutCard: FC<IProps> = ({ exercise, week, day, icon }) => {
    const { user } = useContext(AuthContext);

    return (
        <div
            role="listitem"
            key={exercise.id}
            className="w-full col-span-1 card rounded-lg shadow"
        >
            <div className="w-full flex items-center justify-start p-6 space-x-6">
                <div className="">
                    <div className="bg-ternary w-10 h-10 rounded-full flex justify-center items-center">
                        <div className="">{mapToIcon(icon)}</div>
                    </div>
                </div>
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-secondary text-sm font-medium truncate">
                            {exercise.exercise.name}
                        </h3>
                    </div>
                    <p className="mt-1 text-ternary text-sm truncate">
                        {exercise.minReps === exercise.maxReps
                            ? exercise.maxReps
                            : `${exercise.minReps} - ${exercise.maxReps}`}{' '}
                        {exercise.maxReps > 1 ? 'Reps' : 'Rep'}
                    </p>
                    {!user?.paid && (
                        <p className="mt-1 text-ternary text-sm truncate">
                            {exercise.sets} Sets
                        </p>
                    )}
                </div>
            </div>
            <div>
                {Array.from(Array(exercise.sets).keys()).map((set) => (
                    <WorkoutSet
                        key={set}
                        set={set}
                        exercise={exercise}
                        week={week}
                        day={day}
                    />
                ))}
            </div>
        </div>
    );
};
