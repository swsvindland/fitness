import { FC, useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addUserFood, getFoodDetails, searchFood } from '../../api';
import { Loading } from '../Loading';
import { EdamamTotalNutrients } from '../../types/EdamamFoodDetails';
import { Button } from '../Buttons/Button';
import { TextField } from '../TextField';
import { Dropdown, DropdownOption } from '../Dropdown';
import { Units } from '../../types/Units';
import { AuthContext } from '../../Auth/Auth';

export const FoodDetail: FC = () => {
    const { user } = useContext(AuthContext);
    const { foodId } = useParams<{ foodId: string }>();
    const [quantity, setQuantity] = useState<number>(1);
    const [unit, setUnit] = useState<DropdownOption>({
        id: Units.Gram,
        name: 'Gram',
    });
    const history = useHistory();

    const mutation = useMutation(addUserFood, {
        onSuccess: () => {
            history.push(`/eat`);
        },
    });

    const searchFoodQuery = useQuery(['SearchFood', foodId], () => {
        if (!foodId) return;
        return searchFood(foodId);
    });

    const foodDetailsQuery = useQuery(
        ['FoodDetails', foodId],
        () => {
            if (!foodId) return;

            const servingSizes = searchFoodQuery.data?.data.at(0)?.measures;

            const servingSize = servingSizes?.find(
                (e) => e.label === 'Serving'
            );

            setQuantity(servingSize?.weight ?? 1);

            return getFoodDetails(foodId, servingSize?.weight ?? 0);
        },
        {
            enabled: !!searchFoodQuery.data,
        }
    );

    const totalNutrients = foodDetailsQuery.data?.data?.totalNutrients;

    if (
        searchFoodQuery.isLoading ||
        foodDetailsQuery.isLoading ||
        !totalNutrients ||
        !user
    ) {
        return <Loading />;
    }

    const options = Object.keys(Units)
        .filter((unit) => isNaN(parseInt(unit)))
        .map((unit, index) => ({ id: index, name: unit }));

    return (
        <div>
            <div className="my-8">
                <h1 className="text-2xl font-bold text-secondary">
                    {searchFoodQuery.data?.data?.at(0)?.food.label}
                </h1>
            </div>
            <div className="flex flex-row align-middle mb-2 justify-between">
                <TextField
                    label="Quantity"
                    type="number"
                    onChange={(event) =>
                        setQuantity(parseFloat(event.target.value))
                    }
                    value={quantity}
                    className="my-auto"
                />
                <Dropdown
                    label="Unit"
                    options={options}
                    selected={unit}
                    setSelected={setUnit}
                    className="my-auto ml-2 w-48"
                />
                <div className="mt-auto mx-2">
                    {mutation.isLoading ? (
                        <Loading />
                    ) : (
                        <Button
                            onClick={() =>
                                mutation.mutate({
                                    edamamFoodId: foodId,
                                    userId: user.id,
                                    amount: quantity,
                                    unit: unit.name,
                                    created: new Date().toISOString(),
                                })
                            }
                        >
                            Add
                        </Button>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-center rounded bg-card p-4">
                {Object.keys(totalNutrients).map((key) => (
                    <div
                        key={key}
                        className="grid grid-cols-3 border-secondary border-t border-x last:border-b p-1"
                    >
                        <div className="text-secondary">
                            {
                                totalNutrients[
                                    key as keyof EdamamTotalNutrients
                                ].label
                            }
                        </div>
                        <div className="text-ternary ml-auto">
                            {totalNutrients[
                                key as keyof EdamamTotalNutrients
                            ].quantity.toFixed(2)}
                        </div>
                        <div className="text-ternary ml-auto">
                            {
                                totalNutrients[
                                    key as keyof EdamamTotalNutrients
                                ].unit
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
