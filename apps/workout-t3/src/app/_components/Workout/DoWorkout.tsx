import { FC, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { Pagination } from "../Pagination";
import { WorkoutCard } from "./WorkoutCard";
import { completeWorkout } from "@fitness/api-legacy";
import { Button } from "../Buttons/Button";
import { Dropdown, DropdownOption } from "../Dropdown";
import { WorkoutCompleted } from "./WorkoutCompleted";
import { LinkSecondaryButton } from "../Buttons/LinkSecondaryButton";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { WorkoutType } from "@fitness/types";

interface IProps {
  workoutId: bigint;
  type: WorkoutType;
}

const generateOptions = (weeks: number): DropdownOption[] => {
  const options: DropdownOption[] = [];
  Array.from(Array(weeks).keys()).forEach((item) => {
    options.push({ id: item + 1, name: `Week ${item + 1}` });
  });

  return options;
};

export const DoWorkout: FC<IProps> = ({ workoutId, type }) => {
  const userId = localStorage.getItem("userId") ?? "";
  const [maxDays, setMaxDays] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [week, setWeek] = useState<DropdownOption>({ id: 1, name: "Week 1" });
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();

  const workoutQuery = api.workouts.getWorkout.useQuery({
    workoutId: Number(workoutId),
    day,
  });
  const nextWorkoutQuery = api.workouts.getNextWorkout.useQuery({
    type: type.toString(),
  });

  const mutation = useMutation(completeWorkout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["Dashboard"]);
    },
  });

  useMemo(() => {
    const workout = workoutQuery.data;
    if (!workout) return;

    setMaxDays(workout.Days);
    setOptions(generateOptions(workout.Duration));
  }, [workoutQuery.data]);

  if (workoutQuery.isLoading || nextWorkoutQuery.isLoading) {
    return <LoadingSpinner />;
  }

  if (nextWorkoutQuery.data?.workoutCompleted) {
    return <WorkoutCompleted />;
  }

  const handleCompleteWorkout = () => {
    mutation.mutate({
      workoutId: Number(workoutId),
      userId,
      day,
      week: week.id,
    });

    router.replace("/");
  };

  return (
    <div className="container">
      <Dropdown options={options} selected={week} setSelected={setWeek} />
      <Pagination selected={day} setSelected={setDay} pages={maxDays} />
      <div role="list" className="grid grid-cols-1 gap-6">
        {workoutQuery.data?.WorkoutExercise.filter((ex) => ex.Day === day).map(
          (exercise) => (
            <WorkoutCard
              key={exercise.Id}
              workoutExerciseId={exercise.Id ?? 0}
              day={day}
              week={week.id}
            />
          ),
        )}
      </div>
      <div className="mt-2 flex w-full flex-col items-center justify-center gap-2 md:flex-row">
        <Button
          onClick={handleCompleteWorkout}
          className="flex w-full max-w-md justify-center align-middle"
        >
          Complete Workout
        </Button>
        {workoutQuery.data?.UserId ? (
          <LinkSecondaryButton
            to={`/workout/edit/${workoutId}`}
            className="flex w-full max-w-md justify-center align-middle"
          >
            Edit Workout
          </LinkSecondaryButton>
        ) : null}
      </div>
    </div>
  );
};
