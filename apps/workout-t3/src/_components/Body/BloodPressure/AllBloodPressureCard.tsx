"use client";

import { format } from "date-fns";
import { TextField } from "../../TextFields/TextField";
import { LoadingSpinner } from "../../Loading/LoadingSpinner";
import { CircleCheckSolid } from "../../Icons/CircleCheckSolid";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteUserBloodPressure,
  updateUserBloodPressure,
} from "@fitness/api-legacy";
import { CircleXMark } from "../../Icons/CircleXMark";

interface IProps {
  id: number;
  date: string;
  defaultSystolic: number;
  defaultDiastolic: number;
}

export const AllBloodPressureCard: FC<IProps> = ({
  id,
  date,
  defaultSystolic,
  defaultDiastolic,
}) => {
  const userId = localStorage.getItem("userId") ?? "";
  const [systolic, setSystolic] = useState<string>(defaultSystolic.toString());
  const [diastolic, setDiastolic] = useState<string>(
    defaultDiastolic.toString(),
  );
  const [saved, setSaved] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const updateMutation = useMutation(updateUserBloodPressure, {
    onSuccess: () => {
      setSaved(true);
    },
  });

  const deleteMutation = useMutation(deleteUserBloodPressure, {
    onSuccess: () => {
      queryClient.invalidateQueries(["UserBloodPressure"]);
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
            id={`user-systolic-${date}`}
            label="Systolic"
            value={systolic}
            type="number"
            inputMode="decimal"
            onChange={(event) => {
              setSystolic(event.target.value);
            }}
            className="my-auto"
          />
        </div>
        <div className="flex flex-1 border-r border-secondary p-2">
          <TextField
            id={`user-diastolic-${date}`}
            label="Diastolic"
            value={diastolic}
            type="number"
            inputMode="decimal"
            onChange={(event) => {
              setDiastolic(event.target.value);
            }}
            className="my-auto"
          />
        </div>
        <div className="flex flex-none">
          <div className="inline-flex w-16 flex-1 items-center justify-center border-r border-secondary py-4 text-sm font-medium">
            <button
              className="h-8 w-8"
              onClick={() => {
                updateMutation.mutate({
                  id,
                  userId,
                  systolic: parseInt(systolic),
                  diastolic: parseInt(diastolic),
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
