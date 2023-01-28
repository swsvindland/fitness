import { FC } from 'react';
import { WorkoutSet } from './WorkoutSet';
import { WorkoutExercise } from '../../types/WorkoutExercise';
import { ExerciseIcon } from '../../types/Exercise';
import { Barbell } from '../Icons/Barbell';
import { Dumbbell } from '../Icons/Dumbbell';
import { Cardio } from '../Icons/Cardio';
import { Cable } from '../Icons/Cable';
import { BodyWeight } from '../Icons/BodyWeight';
import { Band } from '../Icons/Band';
import { Machine } from '../Icons/Machine';
import { WorkoutSetTime } from './WorkoutSetTime';
import { getUserWorkoutExercise } from '../../api';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';

interface IProps {
    exercise: WorkoutExercise;
    week: number;
    day: number;
    icon?: ExerciseIcon;
}

const mapToIcon = (icon?: ExerciseIcon) => {
    switch (icon) {
        case ExerciseIcon.Barbell:
            return <Barbell className="w-8 fill-primary-dark" />;
        case ExerciseIcon.Dumbbell:
            return <Dumbbell className="w-8 fill-primary-dark" />;
        case ExerciseIcon.Cable:
            return <Cable className="w-8 fill-primary-dark" />;
        case ExerciseIcon.Bodyweight:
            return <BodyWeight className="w-8 fill-primary-dark" />;
        case ExerciseIcon.Band:
            return <Band className="w-8 fill-primary-dark" />;
        case ExerciseIcon.Machine:
            return <Machine className="w-8 fill-primary-dark" />;
        case ExerciseIcon.Cardio:
            return <Cardio className="w-8 fill-primary-dark" />;
        default:
            return <></>;
    }
};

export const WorkoutCard: FC<IProps> = ({ exercise, week, day, icon }) => {
    const workoutExerciseQuery = useQuery(
        ['UserWorkoutExercises', exercise.id, week, day],
        () => getUserWorkoutExercise(exercise.id!, week, day),
        { enabled: !!exercise.id }
    );

    if (exercise.id === undefined) {
        return null;
    }

    if (workoutExerciseQuery.isLoading) {
        return <Loading />;
    }

    console.log(workoutExerciseQuery.data);

    return (
        <div
            role="listitem"
            key={exercise.id}
            className="card col-span-1 w-full rounded-lg shadow"
        >
            <div className="flex w-full items-center justify-start space-x-6 p-6">
                <div className="">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ternary">
                        <div className="">{mapToIcon(icon)}</div>
                    </div>
                </div>
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="truncate text-sm font-medium text-secondary">
                            {exercise.exercise?.name}
                        </h3>
                    </div>

                    {exercise.time ? (
                        <p className="mt-1 truncate text-sm text-ternary">
                            {(exercise.time ?? 0) / 60} minutes
                        </p>
                    ) : (
                        <p className="mt-1 truncate text-sm text-ternary">
                            {exercise.minReps === exercise.maxReps
                                ? exercise.maxReps
                                : `${exercise.minReps} - ${exercise.maxReps}`}{' '}
                            {exercise?.maxReps ?? 0 > 1 ? 'Reps' : 'Rep'}
                        </p>
                    )}
                </div>
            </div>
            <div>
                {workoutExerciseQuery.isFetching ? (
                    <div className="flex flex-col">
                        {Array.from({
                            length: workoutExerciseQuery.data?.data.sets ?? 1,
                        }).map((_, index) => (
                            <Loading key={index} className="my-2" />
                        ))}
                    </div>
                ) : (
                    <>
                        {workoutExerciseQuery.data?.data.userWorkoutActivities.map(
                            (activity, index) => (
                                <>
                                    {activity.time ? (
                                        <WorkoutSetTime
                                            key={index}
                                            id={activity.id}
                                            workoutExerciseId={
                                                activity.workoutExerciseId
                                            }
                                            set={index}
                                            week={week}
                                            day={day}
                                            defaultReps={activity.reps}
                                            defaultTime={activity.time}
                                            defaultSaved={activity.saved}
                                        />
                                    ) : (
                                        <WorkoutSet
                                            key={index}
                                            id={activity.id}
                                            workoutExerciseId={
                                                activity.workoutExerciseId
                                            }
                                            set={index}
                                            week={week}
                                            day={day}
                                            defaultReps={activity.reps}
                                            defaultWeight={activity.weight}
                                            defaultSaved={activity.saved}
                                        />
                                    )}
                                </>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
