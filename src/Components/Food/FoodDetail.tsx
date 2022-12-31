import { FC, useContext, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addUserFood, getFoodDetails } from '../../api';
import { Loading } from '../Loading';
import { Button } from '../Buttons/Button';
import { TextField } from '../TextFields/TextField';
import { Dropdown, DropdownOption } from '../Dropdown';
import { AuthContext } from '../Auth/Auth';
import { useShowBackButton } from '../Navigation/headerHooks';
import { NutritionLabel } from './NutritionLabel';

export const FoodDetail: FC = () => {
    useShowBackButton();
    const { user } = useContext(AuthContext);
    const { foodId } = useParams<{ foodId: string }>();
    const [displayedQuantity, setDisplayedQuantity] = useState<number>(1);
    const [unit, setUnit] = useState<DropdownOption | undefined>(undefined);

    const history = useHistory();

    const mutation = useMutation(addUserFood, {
        onSuccess: () => {
            history.push(`/eat`);
        },
    });

    const foodDetailsQuery = useQuery(['FoodDetails', foodId], () => {
        if (!foodId) return;

        return getFoodDetails(parseInt(foodId));
    });

    const options: DropdownOption[] | undefined =
        foodDetailsQuery.data?.data?.servings.map((serving) => ({
            id: serving.id,
            name: serving.servingDescription,
        }));

    useMemo(() => {
        if (!unit && options && options.length > 0) {
            setUnit(options.at(0));
        }
    }, [options, unit]);

    return (
        <div>
            <div className="my-8">
                <h1 className="text-2xl font-bold text-secondary">
                    {foodDetailsQuery.data?.data.name}
                </h1>
            </div>
            <div className="w-full flex flex-col align-middle mb-2 justify-between">
                <TextField
                    label="Quantity"
                    type="number"
                    onChange={(event) =>
                        setDisplayedQuantity(parseInt(event.target.value) ?? 1)
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
                <div className="p-1 mt-2">
                    {mutation.isLoading ? (
                        <Loading />
                    ) : (
                        <Button
                            className="w-full"
                            onClick={() =>
                                mutation.mutate({
                                    foodV2Id: parseInt(foodId),
                                    userId: user?.id ?? '',
                                    servingId: unit?.id ?? 0,
                                    servingAmount: displayedQuantity,
                                })
                            }
                        >
                            Add
                        </Button>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-center rounded w-96">
                {foodDetailsQuery.isFetching && <Loading />}
                {foodDetailsQuery.data?.data.servings
                    .filter((item) => item.id === unit?.id)
                    .map((serving) => (
                        <NutritionLabel
                            serving={serving}
                            displayedQuantity={displayedQuantity}
                        />
                    ))}
            </div>
        </div>
    );
};
