import { format } from "date-fns";
import { TextField } from "../../TextFields/TextField";
import { Units } from "@fitness/types";
import { LoadingSpinner } from "../../Loading/LoadingSpinner";
import { CircleCheckSolid } from "../../Icons/CircleCheckSolid";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserWeight, updateUserWeight } from "@fitness/api-legacy";
import { CircleXMark } from "../../Icons/CircleXMark";
import { api } from "~/trpc/react";

interface IProps {
  id: number;
  date: string;
  defaultWeight: number;
}

export const AllWeightCard: FC<IProps> = ({ id, date, defaultWeight }) => {
  const userId = localStorage.getItem("userId") ?? "";
  const [weight, setWeight] = useState<string>(defaultWeight.toString());
  const [saved, setSaved] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const userQuery = api.user.getUser.useQuery();

  const updateMutation = useMutation(updateUserWeight, {
    onSuccess: () => {
      setSaved(true);
    },
  });

  const deleteMutation = useMutation(deleteUserWeight, {
    onSuccess: () => {
      queryClient.invalidateQueries(["UserWeights"]);
    },
  });

  return (
    <div className="card my-2 p-4">
      <span className="text-lg text-secondary">
        {format(new Date(date ?? ""), "PP")}
      </span>
      <hr className="border-secondary" />
      <div className="flex flex-row">
        <div className="flex flex-1 border-r border-secondary p-2">
          <TextField
            id={`user-weight-${date}`}
            value={weight}
            type="number"
            inputMode="decimal"
            onChange={(event) => {
              setWeight(event.target.value);
            }}
            className="my-auto"
          />
          <span className="mx-2 my-auto text-xs text-ternary">
            {userQuery.data?.Unit === Units.Imperial ? "lbs" : "kg"}
          </span>
        </div>
        <div className="flex flex-none">
          <div className="inline-flex w-16 flex-1 items-center justify-center border-r border-secondary py-4 text-sm font-medium">
            <button
              className="h-8 w-8"
              onClick={() => {
                updateMutation.mutate({
                  id,
                  userId,
                  weight: parseFloat(weight),
                  created: date,
                });
              }}
            >
              {updateMutation.isLoading ? (
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
          <div className="inline-flex w-16 flex-1 items-center justify-center py-4 text-sm font-medium">
            <button
              className="h-8 w-8"
              onClick={() => {
                deleteMutation.mutate(id);
              }}
            >
              {deleteMutation.isLoading ? (
                <LoadingSpinner />
              ) : (
                <CircleXMark className="fill-error" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};