'use client';
import { FC, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { deleteUserFood, updateUserFood } from '@fitness/api-legacy';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { Button } from '../Buttons/Button';
import { TextField } from '../TextFields/TextField';
import { Dropdown, DropdownOption } from '../Dropdown';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { NutritionLabel } from './NutritionLabel';
import { useUpdateFoodCache } from './hooks';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

interface IProps {
    userFoodId: number;
}

export const UserFoodDetail: FC<IProps> = ({ userFoodId }) => {
    const [displayedQuantity, setDisplayedQuantity] = useState<string>('1');
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

    const userFoodQuery = api.food.getUserFoodById.useQuery({ userFoodId });

    const foodDetailsQuery = api.food.getFoodById.useQuery(
        { foodId: Number(userFoodQuery.data?.FoodV2Id) ?? -1 },
        { enabled: userFoodQuery.isFetched && !!userFoodQuery.data?.FoodV2Id }
    );

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

    useMemo(() => {
        setDisplayedQuantity(
            userFoodQuery.data?.ServingAmount.toString() ?? '1'
        );
    }, [userFoodQuery.data?.ServingAmount]);

    return (
        <div className="container grid grid-cols-1">
            <div className="my-8">
                <h1 className="text-secondary text-2xl font-bold">
                    {userFoodQuery.data?.FoodV2.Name}
                </h1>
            </div>
            <div className="mb-2 flex w-full flex-col justify-between align-middle">
                <TextField
                    label="Quantity"
                    type="number"
                    inputMode="decimal"
                    onChange={(event) =>
                        setDisplayedQuantity(event.target.value)
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
                    {updateMutation.isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <Button
                            className="w-full"
                            // onClick={() =>
                            //     updateMutation.mutate({
                            //         id: foodDetailsQuery.data?.data.id,
                            //         servingAmount:
                            //             parseFloat(displayedQuantity),
                            //         servingId: unit?.id ?? 0,
                            //         foodV2Id:
                            //             foodDetailsQuery.data?.data.foodV2Id ??
                            //             0,
                            //         userId,
                            //         created:
                            //             foodDetailsQuery.data?.data.created,
                            //         updated:
                            //             foodDetailsQuery.data?.data.updated,
                            //     })
                            // }
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
                            // onClick={() =>
                            //     deleteMutation.mutate(
                            //         userfoodDetailsQuery.data?.Id ?? 0
                            //     )
                            // }
                        >
                            Delete
                        </SecondaryButton>
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
