import { FC, Fragment } from 'react';
import { WorkoutSet } from './WorkoutSet';
import { ExerciseIcon } from '@fitness/types';
import { Barbell } from '../Icons/Barbell';
import { Dumbbell } from '../Icons/Dumbbell';
import { Cardio } from '../Icons/Cardio';
import { Cable } from '../Icons/Cable';
import { BodyWeight } from '../Icons/BodyWeight';
import { Band } from '../Icons/Band';
import { Machine } from '../Icons/Machine';
import { WorkoutSetTime } from './WorkoutSetTime';
import { getUserWorkoutExercise } from '@fitness/api';
import { useQuery } from '@tanstack/react-query';
import { Gear } from '../Icons/Gear';
import { LinkSecondaryButton } from '../Buttons/LinkSecondaryButton';

interface IProps {
    workoutExerciseId: number;
    week: number;
    day: number;
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

export const WorkoutCard: FC<IProps> = ({ workoutExerciseId, week, day }) => {
    const workoutExerciseQuery = useQuery(
        ['UserWorkoutExercises', workoutExerciseId, week, day],
        () => getUserWorkoutExercise(workoutExerciseId!, week, day),
        { enabled: !!workoutExerciseId }
    );

    if (!workoutExerciseId) return null;

    if (workoutExerciseQuery.isLoading) {
        return (
            <div role="status" className="w-full animate-pulse">
                <div className="bg-card dark:bg-primary-dark my-2 h-64 rounded"></div>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <div
            role="listitem"
            className="card col-span-1 w-full rounded-lg shadow"
        >
            <div className="flex w-full items-center justify-start space-x-6 p-6">
                <div className="">
                    <div className="bg-ternary flex h-10 w-10 items-center justify-center rounded-full">
                        <div className="">
                            {mapToIcon(
                                workoutExerciseQuery.data?.data.exercise?.icon
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-secondary truncate text-sm font-medium">
                            {workoutExerciseQuery.data?.data.exercise?.name}
                        </h3>
                    </div>

                    {workoutExerciseQuery.data?.data.time ? (
                        <p className="text-ternary mt-1 truncate text-sm">
                            {(workoutExerciseQuery.data?.data.time ?? 0) / 60}{' '}
                            minutes
                        </p>
                    ) : (
                        <p className="text-ternary mt-1 truncate text-sm">
                            {workoutExerciseQuery.data?.data.minReps ===
                            workoutExerciseQuery.data?.data.maxReps
                                ? workoutExerciseQuery.data?.data.maxReps
                                : `${workoutExerciseQuery.data?.data.minReps} - ${workoutExerciseQuery.data?.data.maxReps}`}{' '}
                            {workoutExerciseQuery.data?.data?.maxReps ?? 0 > 1
                                ? 'Reps'
                                : 'Rep'}
                        </p>
                    )}
                </div>
                <div className="">
                    <LinkSecondaryButton
                        to={`/workout/substitution/${workoutExerciseId}`}
                    >
                        <Gear className="fill-secondary w-8" />
                    </LinkSecondaryButton>
                </div>
            </div>
            <div>
                {workoutExerciseQuery.data?.data.userWorkoutActivities.map(
                    (activity, index) => (
                        <Fragment key={index}>
                            {activity.time ? (
                                <WorkoutSetTime
                                    key={`${index}-${activity.id}-${activity.time}`}
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
                                    timer={
                                        workoutExerciseQuery.data?.data.restTime
                                    }
                                />
                            ) : (
                                <WorkoutSet
                                    key={`${index}-${activity.id}-${activity.weight}`}
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
                                    timer={
                                        workoutExerciseQuery.data?.data.restTime
                                    }
                                />
                            )}
                        </Fragment>
                    )
                )}
            </div>
        </div>
    );
};
