import { type FC, type FormEvent, useContext, useMemo, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { useHistory } from 'react-router-dom';
import { addCustomMacros, getMacros } from '../../api';
import { useShowBackButton } from '../Navigation/headerHooks';

interface IState {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
    caloriesHigh?: number;
    proteinHigh?: number;
    fatHigh?: number;
    carbsHigh?: number;
    fiberHigh?: number;
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
        caloriesHigh: undefined,
        proteinHigh: undefined,
        fatHigh: undefined,
        carbsHigh: undefined,
        fiberHigh: undefined,
    });
    const history = useHistory();

    const macrosQuery = useQuery(['Macros'], () => getMacros());

    const mutation = useMutation(addCustomMacros, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['Macros']);
        },
    });

    useMemo(() => {
        setState({
            calories: macrosQuery.data?.data.calories ?? 0,
            protein: macrosQuery.data?.data.protein ?? 0,
            fat: macrosQuery.data?.data.fat ?? 0,
            carbs: macrosQuery.data?.data.carbs ?? 0,
            fiber: macrosQuery.data?.data.fiber ?? 0,
            caloriesHigh: macrosQuery.data?.data.caloriesHigh,
            proteinHigh: macrosQuery.data?.data.proteinHigh,
            fatHigh: macrosQuery.data?.data.fatHigh,
            carbsHigh: macrosQuery.data?.data.carbsHigh,
            fiberHigh: macrosQuery.data?.data.fiberHigh,
        });
    }, [macrosQuery.data]);

    useMemo(() => {
        let caloriesHigh = 0;
        caloriesHigh += (state.proteinHigh ?? 0) * 4;
        caloriesHigh += (state.fatHigh ?? 0) * 9;
        caloriesHigh += (state.carbsHigh ?? 0) * 4;
        setState({
            ...state,
            caloriesHigh: isNaN(caloriesHigh) ? undefined : caloriesHigh,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.proteinHigh, state.fatHigh, state.carbsHigh]);

    useMemo(() => {
        let calories = 0;
        calories += state.protein * 4;
        calories += state.fat * 9;
        calories += state.carbs * 4;
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
        });
    };

    return (
        <div className="container">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="card overflow-hidden rounded shadow">
                        <div className="p-4">
                            <div>
                                <span className="text-secondary">Calories</span>
                                <p className="text-ternary">
                                    {state.calories}-{state.caloriesHigh}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
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
                                            protein: parseFloat(
                                                event.target.value
                                            ),
                                        })
                                    }
                                />
                                <TextField
                                    id="proteinHigh"
                                    type="number"
                                    inputMode="decimal"
                                    label="Protein High"
                                    autoComplete="off"
                                    value={state.proteinHigh}
                                    required={false}
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            proteinHigh: parseFloat(
                                                event.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
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
                                    id="fatHigh"
                                    type="number"
                                    inputMode="decimal"
                                    label="Fat High"
                                    autoComplete="off"
                                    value={state.fatHigh}
                                    required={false}
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            fatHigh: parseFloat(
                                                event.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
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
                                            carbs: parseFloat(
                                                event.target.value
                                            ),
                                        })
                                    }
                                />
                                <TextField
                                    id="carbsHigh"
                                    type="number"
                                    inputMode="decimal"
                                    label="Carbs High"
                                    autoComplete="off"
                                    value={state.carbsHigh}
                                    required={false}
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            carbsHigh: parseFloat(
                                                event.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
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
                                            fiber: parseFloat(
                                                event.target.value
                                            ),
                                        })
                                    }
                                />
                                <TextField
                                    id="fiberHigh"
                                    type="number"
                                    inputMode="decimal"
                                    label="Fiber High"
                                    autoComplete="off"
                                    value={state.fiberHigh}
                                    required={false}
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            fiberHigh: parseFloat(
                                                event.target.value
                                            ),
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-between bg-primary-dark px-4 py-3 text-right dark:bg-background sm:px-6">
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
