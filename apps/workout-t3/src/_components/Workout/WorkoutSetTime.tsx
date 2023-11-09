import { FC, useState } from "react";
import { TextField } from "../TextFields/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { addWorkoutActivity } from "@fitness/api-legacy";
import { CircleCheckSolid } from "../Icons/CircleCheckSolid";

interface IProps {
  id: number | undefined;
  workoutExerciseId: number;
  set: number;
  week: number;
  day: number;
  defaultReps: number;
  defaultTime?: number;
  defaultSaved: boolean;
}

interface IState {
  reps: number;
  time: string;
}

export const WorkoutSetTime: FC<IProps> = ({
  id,
  workoutExerciseId,
  set,
  week,
  day,
  defaultReps,
  defaultTime,
  defaultSaved,
}) => {
  const userId = localStorage.getItem("userId") ?? "";
  const [state, setState] = useState<IState>({
    reps: defaultReps ?? 0,
    time: ((defaultTime ?? 0) / 60)?.toString(),
  });
  const [saved, setSaved] = useState<boolean>(defaultSaved);
  const queryClient = useQueryClient();

  const mutation = useMutation(addWorkoutActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "UserWorkoutExercises",
        workoutExerciseId,
      ]);
      setSaved(true);
    },
  });

  return (
    <div className="flex border-t border-ternary">
      <div className="flex flex-1 border-r border-ternary p-2">
        <TextField
          id={`exercise-weight-${id}-${set}`}
          value={state.time}
          type="number"
          inputMode="decimal"
          onChange={(event) => {
            setState({
              ...state,
              time: event.target.value,
            });
          }}
          className="my-auto"
        />
        <span className="mx-2 my-auto text-xs text-ternary">minutes</span>
      </div>
      <div className="flex w-16 flex-none">
        <div className="inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium">
          <button
            className="h-8 w-8"
            onClick={() => {
              mutation.mutate({
                id: id,
                userId,
                workoutExerciseId: workoutExerciseId,
                reps: state.reps,
                time: parseFloat(state.time) * 60,
                set,
                week,
                day,
              });
            }}
          >
            {mutation.isLoading ? (
              <LoadingSpinner />
            ) : (
              <CircleCheckSolid
                className={
                  saved
                    ? "fill-secondary"
                    : "rounded-full border border-ternary fill-transparent"
                }
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
