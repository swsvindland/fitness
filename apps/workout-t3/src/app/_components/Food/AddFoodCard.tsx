import { SecondaryButton } from "../Buttons/SecondaryButton";
import { MinusSolid } from "../Icons/MinusSolid";
import { Button } from "../Buttons/Button";
import { PlusSolid } from "../Icons/PlusSolid";
import { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { quickAddFood, quickRemoveFood } from "@fitness/api-legacy";
import { useUpdateFoodCache } from "./hooks";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import Link from "next/link";

interface IProps {
  userFoodId?: number;
  foodId: number;
  name: string;
  brandName: string;
  servingSize: string;
  defaultServings?: number;
}

export const AddFoodCard: FC<IProps> = ({
  userFoodId,
  foodId,
  name,
  brandName,
  servingSize,
  defaultServings,
}) => {
  const [servings, setServings] = useState<number>(defaultServings ?? 0);
  const updateFoodCache = useUpdateFoodCache();

  const quickAddMutation = useMutation(quickAddFood, {
    onSuccess: () => {
      setServings(servings + 1);
      updateFoodCache();
    },
  });

  const quickRemoveMutation = useMutation(quickRemoveFood, {
    onSuccess: () => {
      setServings(servings < 1 ? 0 : servings - 1);
      updateFoodCache();
    },
  });

  const handleAdd = () => {
    quickAddMutation.mutate(foodId);
  };

  const handleRemove = () => {
    quickRemoveMutation.mutate(foodId);
  };

  return (
    <div className="card my-2 flex flex-row items-center justify-between p-4">
      <Link
        href={
          defaultServings && userFoodId
            ? `/eat/user-food/${userFoodId}`
            : `/eat/food/${foodId}`
        }
        className="flex flex-col p-4"
      >
        <span className="text-lg text-secondary">
          {name} ({brandName})
        </span>
        <span className="text-sm text-ternary">{servingSize}</span>
      </Link>
      {!quickAddMutation.isLoading && !quickRemoveMutation.isLoading ? (
        <div className="flex items-center">
          <SecondaryButton onClick={handleRemove} className="ml-1 w-8 w-8 !p-2">
            <MinusSolid className="h-6 w-6 fill-secondary" />
          </SecondaryButton>
          <span className="m-3 text-ternary">{servings}</span>
          <Button onClick={handleAdd} className="mr-1 w-8 w-8 !p-2">
            <PlusSolid className="h-6 w-6 fill-secondary" />
          </Button>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};