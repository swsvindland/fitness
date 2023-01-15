import { Link } from 'react-router-dom';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { MinusSolid } from '../Icons/MinusSolid';
import { Button } from '../Buttons/Button';
import { PlusSolid } from '../Icons/PlusSolid';
import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { quickAddFood, quickRemoveFood } from '../../api';
import { Loading } from '../Loading';

interface IProps {
    foodId: number;
    name: string;
    servingSize: string;
    defaultServings?: number;
}

export const AddFoodCard: FC<IProps> = ({
    foodId,
    name,
    servingSize,
    defaultServings,
}) => {
    const [servings, setServings] = useState<number>(defaultServings ?? 0);

    const quickAddMutation = useMutation(quickAddFood, {
        onSuccess: (data) => {
            setServings(data.data ?? 0);
        },
    });

    const quickRemoveMutation = useMutation(quickRemoveFood, {
        onSuccess: (data) => {
            setServings(data.data ?? 0);
        },
    });

    const handleAdd = () => {
        quickAddMutation.mutate(foodId);
    };

    const handleRemove = () => {
        quickRemoveMutation.mutate(foodId);
    };

    return (
        <div className="card my-2 flex flex-row justify-between items-center p-4">
            <Link to={`/eat/food/${foodId}`} className="flex flex-col p-4">
                <span className="text-lg text-secondary">{name}</span>
                <span className="text-sm text-ternary">{servingSize}</span>
            </Link>
            {quickAddMutation.isLoading || quickRemoveMutation.isLoading ? (
                <Loading />
            ) : (
                <div className="flex items-center">
                    <SecondaryButton
                        onClick={handleRemove}
                        className="w-8 w-8 !p-2 ml-1"
                    >
                        <MinusSolid className="fill-secondary w-6 h-6" />
                    </SecondaryButton>
                    <span className="text-ternary m-3">{servings}</span>
                    <Button onClick={handleAdd} className="w-8 w-8 !p-2 mr-1">
                        <PlusSolid className="fill-secondary w-6 h-6" />
                    </Button>
                </div>
            )}
        </div>
    );
};
