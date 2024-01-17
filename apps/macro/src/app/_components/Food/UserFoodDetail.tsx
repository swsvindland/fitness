'use client';

import { FC, useEffect, useState } from 'react';
import { NutritionLabel } from './NutritionLabel';
import { useUpdateFoodCache } from './hooks';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { DropdownOption } from '~/app/_components/Food/FoodDetail';
import { Input, Select, SelectItem, Spinner } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

interface IProps {
    userFoodId: number;
}

export const UserFoodDetail: FC<IProps> = ({ userFoodId }) => {
    const [displayedQuantity, setDisplayedQuantity] = useState<string>('1');
    const [unit, setUnit] = useState<Set<string>>(new Set([]));
    const router = useRouter();
    const updateFoodCache = useUpdateFoodCache();

    const updateMutation = api.food.updateUserFood.useMutation({
        onSuccess: async () => {
            await updateFoodCache();
            router.push(`/`);
        },
    });

    const deleteMutation = api.food.deleteUserFood.useMutation({
        onSuccess: async () => {
            await updateFoodCache();
            router.push(`/`);
        },
    });

    const userFoodQuery = api.food.getUserFoodById.useQuery({ userFoodId });

    const foodDetailsQuery = api.food.getFoodById.useQuery(
        { foodId: Number(userFoodQuery.data?.FoodV2Id) ?? -1 },
        { enabled: userFoodQuery.isFetched && !!userFoodQuery.data?.FoodV2Id }
    );

    const options: DropdownOption[] | undefined =
        foodDetailsQuery.data?.FoodV2Servings.map((serving) => ({
            value: Number(serving.Id),
            label: serving.ServingDescription ?? '',
        }));

    useEffect(() => {
        if (unit.size === 0 && options && options.length > 0) {
            const newUnit = options[0]!;

            setUnit(new Set([newUnit.value.toString()]));
        }
    }, [options]);

    useEffect(() => {
        setDisplayedQuantity(
            userFoodQuery.data?.ServingAmount.toString() ?? '1'
        );
    }, [userFoodQuery.data?.ServingAmount]);

    const firstUnit = Array.from(unit).pop();

    return (
        <div className="container grid grid-cols-1">
            <div className="my-8">
                <h1 className="text-secondary text-2xl font-bold">
                    {userFoodQuery.data?.FoodV2.Name}
                </h1>
            </div>
            <div className="mb-2 flex w-full flex-col gap-2">
                <Input
                    label="Quantity"
                    type="number"
                    inputMode="decimal"
                    onChange={(event) =>
                        setDisplayedQuantity(event.target.value)
                    }
                    value={displayedQuantity ?? ''}
                />
                {options && (
                    <Select
                        label="Unit"
                        selectionMode="single"
                        selectedKeys={unit}
                        onSelectionChange={setUnit}
                    >
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                )}
                <Button
                    isLoading={updateMutation.isLoading}
                    className="w-full"
                    color="success"
                    onClick={() =>
                        updateMutation.mutate({
                            userFoodId,
                            servingAmount: parseFloat(displayedQuantity),
                            servingId: Number(firstUnit) ?? 0,
                        })
                    }
                >
                    Update
                </Button>
                <Button
                    isLoading={deleteMutation.isLoading}
                    className="w-full"
                    color="danger"
                    onClick={() => deleteMutation.mutate({ userFoodId })}
                >
                    Delete
                </Button>
            </div>
            <div className="flex flex-col justify-center">
                {foodDetailsQuery.isFetching && <Spinner />}
                {foodDetailsQuery.data?.FoodV2Servings.filter(
                    (item) => item.Id.toString() === firstUnit
                ).map((serving) => (
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
