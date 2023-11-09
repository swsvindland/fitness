"use client";

import { FC, FormEvent, useMemo, useState } from "react";
import { TextField } from "../TextFields/TextField";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { Button } from "../Buttons/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editWorkout, getWorkout } from "@fitness/api-legacy";
import { TextArea } from "../TextFields/TextArea";
import { Dropdown, DropdownOption } from "../Dropdown";
import { WorkoutType } from "@fitness/types";
import { useRouter } from "next/navigation";

interface IState {
  name: string;
  description: string;
  days: string;
  weeks: string;
  type: DropdownOption;
}

interface IProps {
  workoutId: number;
}

export const EditCustomWorkout: FC<IProps> = ({ workoutId }) => {
  const userId = localStorage.getItem("userId") ?? "";
  const [state, setState] = useState<IState>({
    name: "",
    description: "",
    days: "",
    weeks: "",
    type: { id: WorkoutType.Resistance, name: "Resistance" },
  });
  const router = useRouter();

  const mutation = useMutation(editWorkout, {
    onSuccess: (data) => {
      router.push(`/workout/edit/exercises/${data.data}`);
    },
  });

  const workoutQuery = useQuery(["Workout", workoutId], () => {
    return getWorkout(workoutId);
  });

  useMemo(() => {
    setState({
      name: workoutQuery.data?.data?.name ?? "",
      description: workoutQuery.data?.data?.description ?? "",
      days: workoutQuery.data?.data?.days.toString() ?? "",
      weeks: workoutQuery.data?.data?.duration.toString() ?? "",
      type: {
        id: workoutQuery.data?.data?.type ?? WorkoutType.Resistance,
        name: WorkoutType[
          workoutQuery.data?.data?.type ?? WorkoutType.Resistance
        ],
      },
    });
  }, [
    workoutQuery.data?.data?.days,
    workoutQuery.data?.data?.description,
    workoutQuery.data?.data?.duration,
    workoutQuery.data?.data?.name,
    workoutQuery.data?.data?.type,
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({
      id: workoutId,
      userId: userId,
      name: state.name,
      description: state.description,
      days: parseInt(state.days),
      duration: parseInt(state.weeks),
      type: state.type.id,
    });
  };

  const handleClear = () => {
    setState({
      name: "",
      description: "",
      days: "",
      weeks: "",
      type: { id: WorkoutType.Resistance, name: "Resistance" },
    });
  };

  const typeOptions = Object.keys(WorkoutType)
    .filter((item) => isNaN(parseInt(item)))
    .map((item, index) => ({ id: index, name: item }));

  return (
    <div className="container">
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleSubmit}>
          <div className="card overflow-hidden rounded shadow">
            <div className="p-4">
              <Dropdown
                label="Workout Type"
                id="workoutType"
                selected={state.type}
                setSelected={(value) => {
                  setState({ ...state, type: value });
                }}
                className="ml-1"
                options={typeOptions}
              />
              <TextField
                id="name"
                type="text"
                label="Workout Name"
                autoComplete="off"
                value={state.name}
                onChange={(event) =>
                  setState({
                    ...state,
                    name: event.target.value,
                  })
                }
              />
              <TextArea
                id="description"
                label="Description"
                autoComplete="off"
                value={state.description}
                rows={4}
                onChange={(event) =>
                  setState({
                    ...state,
                    description: event.target.value,
                  })
                }
              />
              <TextField
                id="days"
                type="number"
                inputMode="decimal"
                label="How many days per week?"
                autoComplete="off"
                value={state.days}
                onChange={(event) =>
                  setState({
                    ...state,
                    days: event.target.value,
                  })
                }
              />
              <TextField
                id="weeks"
                type="number"
                inputMode="decimal"
                label="How many weeks?"
                autoComplete="off"
                value={state.weeks}
                onChange={(event) =>
                  setState({
                    ...state,
                    weeks: event.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-between bg-primary-dark px-4 py-3 text-right dark:bg-background sm:px-6">
              <SecondaryButton onClick={handleClear}>Clear</SecondaryButton>
              <Button type="submit">Next</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
