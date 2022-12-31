import { FC, useContext, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteUserFood, getUserFood, updateUserFood } from '../../api';
import { Loading } from '../Loading';
import { Button } from '../Buttons/Button';
import { TextField } from '../TextFields/TextField';
import { Dropdown, DropdownOption } from '../Dropdown';
import { AuthContext } from '../Auth/Auth';
import { useShowBackButton } from '../Navigation/headerHooks';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { NutritionLabel } from './NutritionLabel';

export const UserFoodDetail: FC = () => {
    useShowBackButton();
    const { user } = useContext(AuthContext);
    const { userFoodId } = useParams<{ userFoodId: string }>();
    const [displayedQuantity, setDisplayedQuantity] = useState<number>(1);
    const [unit, setUnit] = useState<DropdownOption | undefined>(undefined);
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

    const foodDetailsQuery = useQuery(['UserFood', userFoodId], () => {
        if (!userFoodId) return;
        if (isNaN(parseInt(userFoodId))) return;

        return getUserFood(parseInt(userFoodId));
    });

    const options: DropdownOption[] | undefined =
        foodDetailsQuery.data?.data.foodV2?.servings.map((serving) => ({
            id: serving.id,
            name: serving.servingDescription,
        }));

    useMemo(() => {
        if (!unit && options && options.length > 0) {
            setUnit(options.at(0));
        }
    }, [options, unit]);

    useMemo(() => {
        setDisplayedQuantity(foodDetailsQuery.data?.data.servingAmount ?? 1);
    }, [foodDetailsQuery.data?.data.servingAmount]);

    return (
        <div>
            <div className="my-8">
                <h1 className="text-2xl font-bold text-secondary">
                    {foodDetailsQuery.data?.data.foodV2?.name}
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
                    {updateMutation.isLoading ? (
                        <Loading />
                    ) : (
                        <Button
                            className="w-full"
                            onClick={() =>
                                updateMutation.mutate({
                                    id: foodDetailsQuery.data?.data.id,
                                    servingAmount: displayedQuantity,
                                    servingId: unit?.id ?? 0,
                                    foodV2Id:
                                        foodDetailsQuery.data?.data.foodV2Id ??
                                        0,
                                    userId: user?.id ?? '',
                                    created:
                                        foodDetailsQuery.data?.data.created,
                                    updated:
                                        foodDetailsQuery.data?.data.updated,
                                })
                            }
                        >
                            Update
                        </Button>
                    )}
                </div>
                <div className="p-1 mt-2">
                    {deleteMutation.isLoading ? (
                        <Loading />
                    ) : (
                        <SecondaryButton
                            className="w-full"
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
            <div className="flex flex-col justify-center rounded w-96">
                {foodDetailsQuery.isFetching && <Loading />}
                {foodDetailsQuery.data?.data.foodV2?.servings
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
