'use client';

import { FC, useMemo, useState } from 'react';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { Button } from '../Buttons/Button';
import { TextField } from '../TextFields/TextField';
import { Dropdown, DropdownOption } from '../Dropdown';
import { NutritionLabel } from './NutritionLabel';
import { useUpdateFoodCache } from './hooks';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

interface IProps {
    foodId: number;
}

export const FoodDetail: FC<IProps> = ({ foodId }) => {
    const [displayedQuantity, setDisplayedQuantity] = useState<string>('1');
    const [unit, setUnit] = useState<DropdownOption | undefined>(undefined);
    const updateFoodCache = useUpdateFoodCache();

    const router = useRouter();

    const mutation = api.food.addUserFood.useMutation({
        onSuccess: async () => {
            await updateFoodCache();
            router.push(`/eat`);
        },
    });

    const foodDetailsQuery = api.food.getFoodById.useQuery({ foodId });

    const options: DropdownOption[] | undefined =
        foodDetailsQuery.data?.FoodV2Servings.map((serving) => ({
            id: Number(serving.Id),
            name: serving.ServingDescription ?? '',
        }));

    useMemo(() => {
        if (!unit && options && options.length > 0) {
            setUnit(options.at(0));
        }
    }, [options, unit]);

    return (
        <div className="container grid grid-cols-1">
            <div className="my-8">
                <h1 className="text-secondary text-2xl font-bold">
                    {foodDetailsQuery.data?.Name}
                </h1>
            </div>
            <div className="mb-2 flex w-full flex-col justify-between align-middle">
                <TextField
                    label="Quantity"
                    type="number"
                    inputMode="decimal"
                    onChange={(event) =>
                        setDisplayedQuantity(event.target.value ?? '1')
                    }
                    value={displayedQuantity ?? ''}
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
                    {mutation.isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <Button
                            className="w-full"
                            // onClick={() =>
                            //     mutation.mutate({
                            //         foodV2Id: foodId,
                            //         userId,
                            //         servingId: unit?.id ?? 0,
                            //         servingAmount:
                            //             parseFloat(displayedQuantity),
                            //     })
                            // }
                        >
                            Add
                        </Button>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-center">
                {foodDetailsQuery.isFetching && <LoadingSpinner />}
                {foodDetailsQuery.data?.FoodV2Servings.filter(
                    (item) => Number(item.Id) === unit?.id
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
