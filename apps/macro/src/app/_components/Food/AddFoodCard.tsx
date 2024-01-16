import { FC, useState } from 'react';
import { useUpdateFoodCache } from './hooks';
import Link from 'next/link';
import { api } from '~/trpc/react';
import { Button } from '@nextui-org/button';
import { LoadingSpinner, MinusSolid, PlusSolid } from '@fitness/ui';

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

    const quickAddMutation = api.food.quickAddFood.useMutation({
        onSuccess: async () => {
            setServings(servings + 1);
            await updateFoodCache();
        },
    });

    const quickRemoveMutation = api.food.quickRemoveFood.useMutation({
        onSuccess: async () => {
            setServings(servings < 1 ? 0 : servings - 1);
            await updateFoodCache();
        },
    });

    const handleAdd = () => {
        quickAddMutation.mutate({
            foodId,
            userFoodId: userFoodId ?? null,
            servingAmount: servings + 1,
            date: new Date().toDateString(),
        });
    };

    const handleRemove = () => {
        quickRemoveMutation.mutate({
            foodId,
            userFoodId: userFoodId ?? null,
            servingAmount: servings - 1,
        });
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
                <span className="text-secondary text-lg">
                    {name} ({brandName})
                </span>
                <span className="text-ternary text-sm">{servingSize}</span>
            </Link>
            {!quickAddMutation.isLoading && !quickRemoveMutation.isLoading ? (
                <div className="flex items-center">
                    <Button onClick={handleRemove} className="ml-1 w-8 !p-2">
                        <MinusSolid className="fill-secondary h-6 w-6" />
                    </Button>
                    <span className="text-ternary m-3">{servings}</span>
                    <Button onClick={handleAdd} className="mr-1 w-8 !p-2">
                        <PlusSolid className="fill-secondary h-6 w-6" />
                    </Button>
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
};
