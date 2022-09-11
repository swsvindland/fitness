import { FC } from 'react';
import { WorkoutSet } from './WorkoutSet';
import { WorkoutBlockExercise } from '../../types/WorkoutBlockExercise';

interface IProps {
    exercise: WorkoutBlockExercise;
    week: number;
    day: number;
}

export const WorkoutCard: FC<IProps> = ({ exercise, week, day }) => {
    return (
        <div
            role="listitem"
            key={exercise.id}
            className="w-full col-span-1 bg-card rounded-lg shadow"
        >
            <div className="w-full flex items-center justify-start p-6 space-x-6">
                <div className="">
                    <div className="bg-ternary w-10 h-10 rounded-full" />
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
