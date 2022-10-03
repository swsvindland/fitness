import { FC, useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addUserFood, getFoodDetails } from '../../api';
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
    const [quantity, setQuantity] = useState<number>(100);
    const [unit, setUnit] = useState<DropdownOption>({
        id: Units.Gram,
        name: 'Grams',
    });

    const mutation = useMutation(addUserFood);

    const foodDetailsQuery = useQuery(['FoodDetails', foodId], () => {
        if (!foodId) return;
        return getFoodDetails(foodId);
    });

    const totalNutrients = foodDetailsQuery.data?.data?.totalNutrients;

    if (foodDetailsQuery.isLoading || !totalNutrients || !user) {
        return <Loading />;
    }

    const options = Object.keys(Units)
        .filter((unit) => isNaN(parseInt(unit)))
        .map((unit, index) => ({ id: index, name: unit }));

    return (
        <div>
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
                    <Button
                        onClick={() =>
                            mutation.mutate({
                                edamamFoodId: foodId,
                                userId: user.id,
                                amount: quantity,
                                units: unit.name,
                            })
                        }
                    >
                        Add
                    </Button>
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
                            {
                                totalNutrients[
                                    key as keyof EdamamTotalNutrients
                                ].quantity
                            }
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
