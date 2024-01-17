import { FC, useState } from 'react';
import { useUpdateFoodCache } from './hooks';
import { api } from '~/trpc/react';
import { Button } from '@nextui-org/button';
import { MinusSolid, PlusSolid } from '@fitness/ui';
import { Card, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();

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

    const handlePress = () => {
        console.log('pressed');

        if (defaultServings && userFoodId) {
            router.push(`/user-food/${userFoodId}`);
        } else {
            router.push(`/food/${foodId}`);
        }
    };

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
        <Card
            isPressable
            onPress={handlePress}
            className="flex flex-row items-center justify-between p-4"
        >
            <div className="flex flex-col items-start p-4">
                <span className="text-secondary text-lg">
                    {name} ({brandName})
                </span>
                <span className="text-ternary text-sm">{servingSize}</span>
            </div>
            {!quickAddMutation.isLoading && !quickRemoveMutation.isLoading ? (
                <div className="flex flex-col items-center gap-2">
                    <Button color="success" isIconOnly onClick={handleAdd}>
                        <PlusSolid className="h-6 w-6" />
                    </Button>
                    <span>{servings}</span>
                    <Button color="danger" isIconOnly onClick={handleRemove}>
                        <MinusSolid className="h-6 w-6" />
                    </Button>
                </div>
            ) : (
                <Spinner />
            )}
        </Card>
    );
};
