import { FC, useContext, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteUserFood, getUserFood, updateUserFood } from '../../api';
import { Loading } from '../Loading';
import { Button } from '../Buttons/Button';
import { TextField } from '../TextFields/TextField';
import { Dropdown, DropdownOption } from '../Dropdown';
import { Units } from '../../types/Units';
import { AuthContext } from '../Auth/Auth';
import { useShowBackButton } from '../Navigation/headerHooks';
import { convertFromGramsToUnit, convertFromUnitToGrams } from './convertUnits';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { Food } from '../../types/Food';

export const UserFoodDetail: FC = () => {
    useShowBackButton();
    const { user } = useContext(AuthContext);
    const { foodId } = useParams<{ foodId: string }>();
    const [displayedQuantity, setDisplayedQuantity] = useState<string>('1');
    const [quantity, setQuantity] = useState<number | undefined>(undefined);
    const [servingSize, setServingSize] = useState<number>(0);
    const [unit, setUnit] = useState<DropdownOption>({
        id: Units.Serving,
        name: 'Serving',
    });
    const history = useHistory();

    const updateMutation = useMutation(updateUserFood, {
        onSuccess: () => {
            history.push(`/eat`);
        },
    });

    const deleteMutation = useMutation(deleteUserFood, {
        onSuccess: () => {
            history.push(`/eat`);
        },
    });

    const foodDetailsQuery = useQuery(['UserFood', foodId], () => {
        if (!foodId) return;

        return getUserFood(foodId);
    });

    useMemo(() => {
        const newQuantity = foodDetailsQuery.data?.data.amount ?? 0;
        const newServingSize =
            foodDetailsQuery.data?.data.food?.servingSize ?? 0;
        const newDisplayedQuantity = convertFromGramsToUnit(
            newQuantity,
            Units.Serving,
            newServingSize
        );

        setDisplayedQuantity(newDisplayedQuantity.toString());
        setQuantity(newQuantity);
        setServingSize(newServingSize);
    }, [
        foodDetailsQuery.data?.data.amount,
        foodDetailsQuery.data?.data.food?.servingSize,
    ]);

    useMemo(() => {
        setQuantity(
            convertFromUnitToGrams(
                parseFloat(displayedQuantity),
                unit.id,
                servingSize
            )
        );
    }, [displayedQuantity, servingSize, unit.id]);

    const options = Object.keys(Units)
        .filter((unit) => isNaN(parseInt(unit)))
        .map((unit, index) => ({ id: index, name: unit }));

    const getNutrients = () => {
        const food = foodDetailsQuery.data?.data.food;
        let nutrients: {
            value: number | undefined | Units | string;
            key: string;
        }[] = [];

        if (food) {
            nutrients = Object.keys(food).map((item) => ({
                key: item,
                value: food[item as keyof Food],
            }));
        }

        return nutrients.filter(
            (item) =>
                item.key !== 'id' &&
                item.key !== 'edamamFoodId' &&
                item.key !== 'servingSize' &&
                item.key !== 'servingSizeUnit' &&
                item.key !== 'name' &&
                item.key !== 'brand'
        );
    };

    return (
        <div>
            <div className="my-8">
                <h1 className="text-2xl font-bold text-secondary">
                    {foodDetailsQuery.data?.data.food?.name}
                </h1>
            </div>
            <div className="flex flex-row align-middle mb-2 justify-between">
                <TextField
                    label="Quantity"
                    type="number"
                    inputMode={'decimal'}
                    onChange={(event) =>
                        setDisplayedQuantity(event.target.value)
                    }
                    value={displayedQuantity}
                    className="my-auto"
                />
                <Dropdown
                    label="Unit"
                    options={options}
                    selected={unit}
                    setSelected={setUnit}
                    className="my-auto ml-2 w-48"
                />
                <div className="mt-auto ml-2">
                    {updateMutation.isLoading ? (
                        <Loading />
                    ) : (
                        <Button
                            onClick={() =>
                                updateMutation.mutate({
                                    id: foodDetailsQuery.data?.data.id,
                                    foodId: foodDetailsQuery.data?.data.food
                                        ?.id,
                                    edamamFoodId: foodId,
                                    userId: user?.id ?? '',
                                    amount: quantity ?? 0,
                                    unit: 'Gram',
                                    created: new Date().toDateString(),
                                })
                            }
                        >
                            Update
                        </Button>
                    )}
                </div>
                <div className="mt-auto ml-2">
                    {deleteMutation.isLoading ? (
                        <Loading />
                    ) : (
                        <SecondaryButton
                            onClick={() =>
                                deleteMutation.mutate(
                                    foodDetailsQuery.data?.data.id ?? 0
                                )
                            }
                        >
                            Delete
                        </SecondaryButton>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-center rounded card p-4">
                {foodDetailsQuery.isFetching && <Loading />}
                <div className="grid grid-cols-3 border-secondary border-t border-x last:border-b p-1">
                    <div className="text-secondary">Serving Size</div>
                    <div className="text-ternary ml-auto">
                        {servingSize?.toFixed(2)} ({quantity?.toFixed(2)})
                    </div>
                    <div className="text-ternary ml-auto">g</div>
                </div>
                {getNutrients().map((item) => (
                    <div className="grid grid-cols-3 border-secondary border-t border-x last:border-b p-1">
                        <div className="text-secondary">{item.key}</div>
                        <div className="text-ternary ml-auto">
                            {(
                                parseFloat(item.value?.toString() ?? '0') *
                                ((quantity ?? 0) / servingSize)
                            ).toFixed(2)}
                        </div>
                        <div className="text-ternary ml-auto">g</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
