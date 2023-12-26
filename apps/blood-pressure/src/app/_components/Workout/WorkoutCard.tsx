import { FC } from 'react';
import { ExerciseIcon } from '@fitness/types';
import { Barbell } from '../Icons/Barbell';
import { Dumbbell } from '../Icons/Dumbbell';
import { Cardio } from '../Icons/Cardio';
import { Cable } from '../Icons/Cable';
import { BodyWeight } from '../Icons/BodyWeight';
import { Band } from '../Icons/Band';
import { Machine } from '../Icons/Machine';
import { api } from '~/trpc/react';

interface IProps {
    workoutExerciseId: bigint;
    week: number;
    day: number;
}

const mapToIcon = (icon?: string | null) => {
    switch (icon) {
        case ExerciseIcon.Barbell.toString():
            return <Barbell className="fill-primary-dark w-8" />;
        case ExerciseIcon.Dumbbell.toString():
            return <Dumbbell className="fill-primary-dark w-8" />;
        case ExerciseIcon.Cable.toString():
            return <Cable className="fill-primary-dark w-8" />;
        case ExerciseIcon.Bodyweight.toString():
            return <BodyWeight className="fill-primary-dark w-8" />;
        case ExerciseIcon.Band.toString():
            return <Band className="fill-primary-dark w-8" />;
        case ExerciseIcon.Machine.toString():
            return <Machine className="fill-primary-dark w-8" />;
        case ExerciseIcon.Cardio.toString():
            return <Cardio className="fill-primary-dark w-8" />;
        default:
            return <></>;
    }
};

export const WorkoutCard: FC<IProps> = ({ workoutExerciseId, week, day }) => {
    const workoutExerciseQuery = api.workouts.getWorkoutExercise.useQuery({
        workoutExerciseId: Number(workoutExerciseId),
    });

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
                                workoutExerciseQuery.data?.Exercise?.Icon
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-secondary truncate text-sm font-medium">
                            {workoutExerciseQuery.data?.Exercise?.Name}
                        </h3>
                    </div>

                    {workoutExerciseQuery.data?.Time ? (
                        <p className="text-ternary mt-1 truncate text-sm">
                            {(workoutExerciseQuery.data?.Time ?? 0) / 60}{' '}
                            minutes
                        </p>
                    ) : (
                        <p className="text-ternary mt-1 truncate text-sm">
                            {workoutExerciseQuery.data?.MinReps ===
                            workoutExerciseQuery.data?.MaxReps
                                ? workoutExerciseQuery.data?.MaxReps
                                : `${workoutExerciseQuery.data?.MinReps} - ${workoutExerciseQuery.data?.MaxReps}`}{' '}
                            {workoutExerciseQuery.data?.MaxReps ?? 0 > 1
                                ? 'Reps'
                                : 'Rep'}
                        </p>
                    )}
                </div>
            </div>
            <div>
                {/*{workoutExerciseQuery.data?.data.userWorkoutActivities.map(*/}
                {/*  (activity, index) => (*/}
                {/*    <Fragment key={index}>*/}
                {/*      {activity.time ? (*/}
                {/*        <WorkoutSetTime*/}
                {/*          key={`${index}-${activity.id}-${activity.time}`}*/}
                {/*          id={activity.id}*/}
                {/*          workoutExerciseId={activity.workoutExerciseId}*/}
                {/*          set={index}*/}
                {/*          week={week}*/}
                {/*          day={day}*/}
                {/*          defaultReps={activity.reps}*/}
                {/*          defaultTime={activity.time}*/}
                {/*          defaultSaved={activity.saved}*/}
                {/*        />*/}
                {/*      ) : (*/}
                {/*        <WorkoutSet*/}
                {/*          key={`${index}-${activity.id}-${activity.weight}`}*/}
                {/*          id={activity.id}*/}
                {/*          workoutExerciseId={activity.workoutExerciseId}*/}
                {/*          set={index}*/}
                {/*          week={week}*/}
                {/*          day={day}*/}
                {/*          defaultReps={activity.reps}*/}
                {/*          defaultWeight={activity.weight}*/}
                {/*          defaultSaved={activity.saved}*/}
                {/*        />*/}
                {/*      )}*/}
                {/*    </Fragment>*/}
                {/*  ),*/}
                {/*)}*/}
            </div>
        </div>
    );
};
