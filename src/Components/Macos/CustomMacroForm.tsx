import { FC, FormEvent, useContext, useMemo, useState } from 'react';
import { TextField } from '../TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { useHistory } from 'react-router';
import { addCustomMacros, getMacros } from '../../api';
import { useShowBackButton } from '../Navigation/headerHooks';

interface IState {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
    alcohol: number;
    water: number;
}

export const CustomMacroForm: FC = () => {
    useShowBackButton();
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [state, setState] = useState<IState>({
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        fiber: 0,
        alcohol: 0,
        water: 0,
    });
    const history = useHistory();

    const macrosQuery = useQuery(['Macros'], () => getMacros());

    const mutation = useMutation(addCustomMacros, {
        onSuccess: async () => {
            await queryClient.invalidateQueries([
                'UserBloodPressure',
                user?.id,
            ]);
        },
    });

    useMemo(() => {
        setState({
            calories: macrosQuery.data?.data.calories ?? 0,
            protein: macrosQuery.data?.data.protein ?? 0,
            fat: macrosQuery.data?.data.fat ?? 0,
            carbs: macrosQuery.data?.data.carbs ?? 0,
            fiber: macrosQuery.data?.data.fiber ?? 0,
            alcohol: macrosQuery.data?.data.alcohol ?? 0,
            water: macrosQuery.data?.data.water ?? 0,
        });
    }, [macrosQuery.data]);

    useMemo(() => {
        let calories = 0;
        calories += state.protein * 4;
        calories += state.fat * 9;
        calories += state.carbs * 4;
        calories += state.alcohol * 7;
        setState({
            ...state,
            calories: isNaN(calories) ? 0 : calories,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.protein, state.fat, state.carbs]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) return;
        mutation.mutate({
            id: macrosQuery.data?.data.id,
            calories: state.calories,
            protein: state.protein,
            fat: state.fat,
            carbs: state.carbs,
            fiber: state.fiber,
            alcohol: state.alcohol,
            water: state.water,
        });
        history.goBack();
    };

    const handleClear = (event: FormEvent) => {
        event.preventDefault();
        setState({
            calories: macrosQuery.data?.data.calories ?? 0,
            protein: macrosQuery.data?.data.protein ?? 0,
            fat: macrosQuery.data?.data.fat ?? 0,
            carbs: macrosQuery.data?.data.carbs ?? 0,
            fiber: macrosQuery.data?.data.fiber ?? 0,
            alcohol: macrosQuery.data?.data.alcohol ?? 0,
            water: macrosQuery.data?.data.water ?? 0,
        });
    };

    return (
        <div className="m-4">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded bg-card w-80">
                        <div className="p-4">
                            <div>
                                <span className="text-secondary">Calories</span>
                                <p className="text-ternary">{state.calories}</p>
                            </div>
                            <TextField
                                id="protein"
                                type="number"
                                inputMode="decimal"
                                label="Protein"
                                autoComplete="off"
                                value={state.protein}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        protein: parseFloat(event.target.value),
                                    })
                                }
                            />
                            <TextField
                                id="fat"
                                type="number"
                                inputMode="decimal"
                                label="Fat"
                                autoComplete="off"
                                value={state.fat}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        fat: parseFloat(event.target.value),
                                    })
                                }
                            />
                            <TextField
                                id="carbs"
                                type="number"
                                inputMode="decimal"
                                label="Carbs"
                                autoComplete="off"
                                value={state.carbs}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        carbs: parseFloat(event.target.value),
                                    })
                                }
                            />
                            <TextField
                                id="fiber"
                                type="number"
                                inputMode="decimal"
                                label="Fiber"
                                autoComplete="off"
                                value={state.fiber}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        fiber: parseFloat(event.target.value),
                                    })
                                }
                            />
                            <TextField
                                id="alcohol"
                                type="number"
                                inputMode="decimal"
                                label="Alcohol"
                                autoComplete="off"
                                value={state.alcohol}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        alcohol: parseFloat(event.target.value),
                                    })
                                }
                            />
                            <TextField
                                id="water"
                                type="number"
                                inputMode="decimal"
                                label="Water"
                                autoComplete="off"
                                value={state.water}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        water: parseFloat(event.target.value),
                                    })
                                }
                            />
                        </div>
                        <div className="px-4 py-3 bg-primary-dark text-right sm:px-6 flex justify-between">
                            <SecondaryButton onClick={handleClear}>
                                Clear
                            </SecondaryButton>
                            <Button type="submit">Save</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
