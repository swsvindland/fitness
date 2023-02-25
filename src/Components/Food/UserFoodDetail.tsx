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
import { useUpdateFoodCache } from './hooks';

export const UserFoodDetail: FC = () => {
    useShowBackButton();
    const { user } = useContext(AuthContext);
    const { userFoodId } = useParams<{ userFoodId: string }>();
    const [displayedQuantity, setDisplayedQuantity] = useState<string>('1');
    const [unit, setUnit] = useState<DropdownOption | undefined>(undefined);
    const history = useHistory();
    const updateFoodCache = useUpdateFoodCache();

    const updateMutation = useMutation(updateUserFood, {
        onSuccess: () => {
            updateFoodCache();
            history.push(`/eat`);
        },
    });

    const deleteMutation = useMutation(deleteUserFood, {
        onSuccess: () => {
            updateFoodCache();
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
        setDisplayedQuantity(
            foodDetailsQuery.data?.data.servingAmount.toString() ?? '1'
        );
    }, [foodDetailsQuery.data?.data.servingAmount]);

    return (
        <div className="container grid grid-cols-1">
            <div className="my-8">
                <h1 className="text-2xl font-bold text-secondary">
                    {foodDetailsQuery.data?.data.foodV2?.name}
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
                        <Loading />
                    ) : (
                        <Button
                            className="w-full"
                            onClick={() =>
                                updateMutation.mutate({
                                    id: foodDetailsQuery.data?.data.id,
                                    servingAmount:
                                        parseFloat(displayedQuantity),
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
                <div className="mt-2 p-1">
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
            <div className="flex flex-col justify-center">
                {foodDetailsQuery.isFetching && <Loading />}
                {foodDetailsQuery.data?.data.foodV2?.servings
                    .filter((item) => item.id === unit?.id)
                    .map((serving) => (
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
