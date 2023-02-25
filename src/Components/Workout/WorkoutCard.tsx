import { FC, Fragment } from 'react';
import { WorkoutSet } from './WorkoutSet';
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
                <div className="my-2 h-64 rounded bg-card dark:bg-primary-dark"></div>
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ternary">
                        <div className="">
                            {mapToIcon(
                                workoutExerciseQuery.data?.data.exercise?.icon
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="truncate text-sm font-medium text-secondary">
                            {workoutExerciseQuery.data?.data.exercise?.name}
                        </h3>
                    </div>

                    {workoutExerciseQuery.data?.data.time ? (
                        <p className="mt-1 truncate text-sm text-ternary">
                            {(workoutExerciseQuery.data?.data.time ?? 0) / 60}{' '}
                            minutes
                        </p>
                    ) : (
                        <p className="mt-1 truncate text-sm text-ternary">
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
                        <Gear className="h-6 w-6 fill-secondary" />
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
