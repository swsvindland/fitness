import { FC } from 'react';
import { WorkoutSet } from './WorkoutSet';
import { WorkoutBlockExercise } from '../../types/WorkoutBlockExercise';
import { ExerciseIcon } from '../../types/Exercise';
import { BarbellSolid } from '../../icons/BarbellSolid';
import { DumbbellSolid } from '../../icons/DumbbellSolid';
import { HeartPulseSolid } from '../../icons/HeartPulseSolid';

interface IProps {
    exercise: WorkoutBlockExercise;
    week: number;
    day: number;
    icon?: ExerciseIcon;
}

const mapToIcon = (icon?: ExerciseIcon) => {
    switch (icon) {
        case ExerciseIcon.Barbell:
            return <BarbellSolid className="fill-primary-dark" />;
        case ExerciseIcon.Dumbbell:
            return <DumbbellSolid className="fill-primary-dark" />;
        case ExerciseIcon.Cardio:
            return <HeartPulseSolid className="fill-primary-dark" />;
        default:
            return <></>;
    }
};

export const WorkoutCard: FC<IProps> = ({ exercise, week, day, icon }) => {
    return (
        <div
            role="listitem"
            key={exercise.id}
            className="w-full col-span-1 bg-card rounded-lg shadow"
        >
            <div className="w-full flex items-center justify-start p-6 space-x-6">
                <div className="">
                    <div className="bg-ternary w-10 h-10 rounded-full flex justify-center items-center">
                        <div className="w-4 h-4">{mapToIcon(icon)}</div>
                    </div>
                </div>
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-secondary text-sm font-medium truncate">
                            {exercise.exercise.name}
                        </h3>
                    </div>
                    <p className="mt-1 text-ternary text-sm truncate">
                        {exercise.minReps} - {exercise.maxReps} Reps
                    </p>
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
