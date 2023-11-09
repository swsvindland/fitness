"use client";

import { FC, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  buyWorkout,
  getAllWorkoutExercises,
  getWorkout,
} from "@fitness/api-legacy";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { Pagination } from "../Pagination";
import { Button } from "../Buttons/Button";
import { EditWorkoutExercise } from "./EditWorkoutExercise";
import { WorkoutExercise } from "@fitness/types";
import { useRouter } from "next/navigation";

interface IProps {
  workoutId: number;
}

export const EditCustomWorkoutExercises: FC<IProps> = ({ workoutId }) => {
  const [maxDays, setMaxDays] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    [],
  );
  const queryClient = useQueryClient();
  const router = useRouter();

  const workoutQuery = useQuery(["Workout", workoutId], () => {
    if (!workoutId) return;
    return getWorkout(workoutId);
  });

  const workoutExercisesQuery = useQuery(["WorkoutExercises", workoutId], () =>
    getAllWorkoutExercises(workoutId),
  );

  useMemo(() => {
    setMaxDays(workoutQuery.data?.data?.days || 1);
  }, [workoutQuery.data?.data?.days]);

  useMemo(() => {
    setWorkoutExercises(workoutExercisesQuery.data?.data || []);
  }, [workoutExercisesQuery.data?.data]);

  const handleAddWorkoutExercise = () => {
    const newWorkoutExercise: WorkoutExercise = {
      workoutId: workoutId,
      exerciseId: 0,
      sets: 0,
      minReps: undefined,
      maxReps: undefined,
      time: undefined,
      day,
      order: workoutExercises.length + 1,
      restTime: undefined,
    };

    setWorkoutExercises([...workoutExercises, newWorkoutExercise]);
  };

  const mutation = useMutation(buyWorkout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      router.replace(`/workout`);
    },
  });

  const handleStartWorkout = () => {
    mutation.mutate(workoutId);
  };

  if (workoutQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <Pagination selected={day} setSelected={setDay} pages={maxDays} />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {workoutExercises
          .filter((e) => e.day === day)
          .map((item, index) => (
            <EditWorkoutExercise
              key={index}
              index={index}
              workoutExercise={item}
            />
          ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={handleAddWorkoutExercise}>Add</Button>
      </div>
      <Button
        className="mt-6 flex w-full justify-center text-center"
        onClick={handleStartWorkout}
      >
        Start Workout
      </Button>
    </div>
  );
};
