'use client';

import { FC, useEffect, useState } from 'react';
import { NutritionLabel } from './NutritionLabel';
import { useUpdateFoodCache } from './hooks';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { LoadingSpinner } from '@fitness/ui';
import { Button } from '@nextui-org/button';

export interface DropdownOption {
    value: number;
    label: string;
}

interface IProps {
    foodId: number;
}

export const FoodDetail: FC<IProps> = ({ foodId }) => {
    const [displayedQuantity, setDisplayedQuantity] = useState<string>('1');
    const [unit, setUnit] = useState<Set<string>>(new Set([]));
    const updateFoodCache = useUpdateFoodCache();

    const router = useRouter();

    const mutation = api.food.addUserFood.useMutation({
        onSuccess: async () => {
            await updateFoodCache();
            router.push(`/`);
        },
    });

    const foodDetailsQuery = api.food.getFoodById.useQuery({ foodId });

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

    const firstUnit = Array.from(unit).pop();

    return (
        <div className="container grid grid-cols-1">
            <div className="my-8">
                <h1 className="text-secondary text-2xl font-bold">
                    {foodDetailsQuery.data?.Name}
                </h1>
            </div>
            <div className="mb-2 flex w-full flex-col gap-2">
                <Input
                    label="Quantity"
                    type="number"
                    inputMode="decimal"
                    onChange={(event) =>
                        setDisplayedQuantity(event.target.value ?? '1')
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
                    isLoading={mutation.isLoading}
                    className="w-full"
                    color="success"
                    onClick={() =>
                        mutation.mutate({
                            foodId: foodId,
                            date: new Date().toISOString(),
                            servingId: Number(firstUnit ?? 0),
                            servingAmount: parseFloat(displayedQuantity),
                        })
                    }
                >
                    Add
                </Button>
            </div>
            <div className="flex flex-col justify-center">
                {foodDetailsQuery.isFetching && <LoadingSpinner />}
                {foodDetailsQuery.data?.FoodV2Servings.filter(
                    (item) => item.Id.toString() === firstUnit
                ).map((serving) => (
                    <NutritionLabel
                        serving={serving}
                        displayedQuantity={parseFloat(displayedQuantity)}
                    />
                ))}
            </div>
        </div>
    );
};
