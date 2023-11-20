import { FC } from "react";
import { ExerciseIcon } from "@fitness/types";
import { Barbell } from "../Icons/Barbell";
import { Dumbbell } from "../Icons/Dumbbell";
import { Cardio } from "../Icons/Cardio";
import { Cable } from "../Icons/Cable";
import { BodyWeight } from "../Icons/BodyWeight";
import { Band } from "../Icons/Band";
import { Machine } from "../Icons/Machine";
import { api } from "~/trpc/react";

interface IProps {
  workoutExerciseId: bigint;
  week: number;
  day: number;
}

const mapToIcon = (icon?: string | null) => {
  switch (icon) {
    case ExerciseIcon.Barbell.toString():
      return <Barbell className="w-8 fill-primary-dark" />;
    case ExerciseIcon.Dumbbell.toString():
      return <Dumbbell className="w-8 fill-primary-dark" />;
    case ExerciseIcon.Cable.toString():
      return <Cable className="w-8 fill-primary-dark" />;
    case ExerciseIcon.Bodyweight.toString():
      return <BodyWeight className="w-8 fill-primary-dark" />;
    case ExerciseIcon.Band.toString():
      return <Band className="w-8 fill-primary-dark" />;
    case ExerciseIcon.Machine.toString():
      return <Machine className="w-8 fill-primary-dark" />;
    case ExerciseIcon.Cardio.toString():
      return <Cardio className="w-8 fill-primary-dark" />;
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
        <div className="my-2 h-64 rounded bg-card dark:bg-primary-dark"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div role="listitem" className="card col-span-1 w-full rounded-lg shadow">
      <div className="flex w-full items-center justify-start space-x-6 p-6">
        <div className="">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ternary">
            <div className="">
              {mapToIcon(workoutExerciseQuery.data?.Exercise?.Icon)}
            </div>
          </div>
        </div>
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-secondary">
              {workoutExerciseQuery.data?.Exercise?.Name}
            </h3>
          </div>

          {workoutExerciseQuery.data?.Time ? (
            <p className="mt-1 truncate text-sm text-ternary">
              {(workoutExerciseQuery.data?.Time ?? 0) / 60} minutes
            </p>
          ) : (
            <p className="mt-1 truncate text-sm text-ternary">
              {workoutExerciseQuery.data?.MinReps ===
              workoutExerciseQuery.data?.MaxReps
                ? workoutExerciseQuery.data?.MaxReps
                : `${workoutExerciseQuery.data?.MinReps} - ${workoutExerciseQuery.data?.MaxReps}`}{" "}
              {workoutExerciseQuery.data?.MaxReps ?? 0 > 1 ? "Reps" : "Rep"}
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
