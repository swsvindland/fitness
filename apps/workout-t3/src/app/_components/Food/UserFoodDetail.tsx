"use client";
import { FC, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteUserFood,
  getUserFood,
  updateUserFood,
} from "@fitness/api-legacy";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { Button } from "../Buttons/Button";
import { TextField } from "../TextFields/TextField";
import { Dropdown, DropdownOption } from "../Dropdown";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { NutritionLabel } from "./NutritionLabel";
import { useUpdateFoodCache } from "./hooks";
import { useRouter } from "next/navigation";

interface IProps {
  userFoodId: number;
}

export const UserFoodDetail: FC<IProps> = ({ userFoodId }) => {
  const userId = localStorage.getItem("userId") ?? "";
  const [displayedQuantity, setDisplayedQuantity] = useState<string>("1");
  const [unit, setUnit] = useState<DropdownOption | undefined>(undefined);
  const router = useRouter();
  const updateFoodCache = useUpdateFoodCache();

  const updateMutation = useMutation(updateUserFood, {
    onSuccess: () => {
      updateFoodCache();
      router.push(`/eat`);
    },
  });

  const deleteMutation = useMutation(deleteUserFood, {
    onSuccess: () => {
      updateFoodCache();
      router.push(`/eat`);
    },
  });

  const foodDetailsQuery = useQuery(["UserFood", userFoodId], () => {
    if (!userFoodId) return;

    return getUserFood(userFoodId);
  });

  const options: DropdownOption[] | undefined =
    foodDetailsQuery.data?.data.foodV2?.servings.map((serving) => ({
      id: serving.id,
      name: serving.servingDescription,
    }));

  useMemo(() => {
    if (!unit && options && options.length > 0) {
      setUnit(options.at(0));
    }
  }, [options, unit]);

  useMemo(() => {
    setDisplayedQuantity(
      foodDetailsQuery.data?.data.servingAmount.toString() ?? "1",
    );
  }, [foodDetailsQuery.data?.data.servingAmount]);

  return (
    <div className="container grid grid-cols-1">
      <div className="my-8">
        <h1 className="text-2xl font-bold text-secondary">
          {foodDetailsQuery.data?.data.foodV2?.name}
        </h1>
      </div>
      <div className="mb-2 flex w-full flex-col justify-between align-middle">
        <TextField
          label="Quantity"
          type="number"
          inputMode="decimal"
          onChange={(event) => setDisplayedQuantity(event.target.value)}
          value={displayedQuantity ?? ""}
          className="pr-2"
        />
        <Dropdown
          label="Unit"
          options={options}
          selected={unit}
          setSelected={setUnit}
          className="p-1"
        />
        <div className="mt-2 p-1">
          {updateMutation.isLoading ? (
            <LoadingSpinner />
          ) : (
            <Button
              className="w-full"
              onClick={() =>
                updateMutation.mutate({
                  id: foodDetailsQuery.data?.data.id,
                  servingAmount: parseFloat(displayedQuantity),
                  servingId: unit?.id ?? 0,
                  foodV2Id: foodDetailsQuery.data?.data.foodV2Id ?? 0,
                  userId,
                  created: foodDetailsQuery.data?.data.created,
                  updated: foodDetailsQuery.data?.data.updated,
                })
              }
            >
              Update
            </Button>
          )}
        </div>
        <div className="mt-2 p-1">
          {deleteMutation.isLoading ? (
            <LoadingSpinner />
          ) : (
            <SecondaryButton
              className="w-full"
              onClick={() =>
                deleteMutation.mutate(foodDetailsQuery.data?.data.id ?? 0)
              }
            >
              Delete
            </SecondaryButton>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        {foodDetailsQuery.isFetching && <LoadingSpinner />}
        {foodDetailsQuery.data?.data.foodV2?.servings
          .filter((item) => item.id === unit?.id)
          .map((serving) => (
            <NutritionLabel
              serving={serving}
              displayedQuantity={
                isNaN(parseFloat(displayedQuantity))
                  ? 0
                  : parseFloat(displayedQuantity)
              }
            />
          ))}
      </div>
    </div>
  );
};
