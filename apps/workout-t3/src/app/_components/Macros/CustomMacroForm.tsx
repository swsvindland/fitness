'use client';

import { FC, FormEvent, useMemo, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

interface IState {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
    fiber: string;
    caloriesHigh?: string;
    proteinHigh?: string;
    fatHigh?: string;
    carbsHigh?: string;
    fiberHigh?: string;
}

export const CustomMacroForm: FC = () => {
    const [state, setState] = useState<IState>({
        calories: '',
        protein: '',
        fat: '',
        carbs: '',
        fiber: '',
        caloriesHigh: undefined,
        proteinHigh: undefined,
        fatHigh: undefined,
        carbsHigh: undefined,
        fiberHigh: undefined,
    });
    const router = useRouter();
    const utils = api.useUtils();

    const macrosQuery = api.macros.getMacros.useQuery();

    const mutation = api.customMacros.createCustomMacros.useMutation({
        onSuccess: async () => {
            await utils.macros.invalidate();
            await utils.customMacros.invalidate();
        },
    });

    useMemo(() => {
        setState({
            calories: macrosQuery.data?.Calories.toFixed(0) ?? '',
            protein: macrosQuery.data?.Protein.toFixed(0) ?? '',
            fat: macrosQuery.data?.Fat.toFixed(0) ?? '',
            carbs: macrosQuery.data?.Carbs.toFixed(0) ?? '',
            fiber: macrosQuery.data?.Fiber.toFixed(0) ?? '',
            caloriesHigh: macrosQuery.data?.CaloriesHigh?.toFixed(0),
            proteinHigh: macrosQuery.data?.ProteinHigh?.toFixed(0),
            fatHigh: macrosQuery.data?.FatHigh?.toFixed(0),
            carbsHigh: macrosQuery.data?.CarbsHigh?.toFixed(0),
            fiberHigh: macrosQuery.data?.FiberHigh?.toFixed(0),
        });
    }, [macrosQuery.data]);

    useMemo(() => {
        let caloriesHigh = 0;
        caloriesHigh += parseInt(state.proteinHigh ?? '0') * 4;
        caloriesHigh += parseInt(state.fatHigh ?? '0') * 9;
        caloriesHigh += parseInt(state.carbsHigh ?? '0') * 4;
        setState({
            ...state,
            caloriesHigh: isNaN(caloriesHigh)
                ? undefined
                : caloriesHigh.toString(),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.proteinHigh, state.fatHigh, state.carbsHigh]);

    useMemo(() => {
        let calories = 0;
        calories += parseInt(state.protein) * 4;
        calories += parseInt(state.fat) * 9;
        calories += parseInt(state.carbs) * 4;
        setState({
            ...state,
            calories: isNaN(calories) ? '' : calories.toString(),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.protein, state.fat, state.carbs]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({
            calories: parseInt(state.calories),
            protein: parseInt(state.protein),
            fat: parseInt(state.fat),
            carbs: parseInt(state.carbs),
            fiber: parseInt(state.fiber),
            caloriesHigh: state.caloriesHigh
                ? parseInt(state.caloriesHigh)
                : null,
            proteinHigh: state.proteinHigh ? parseInt(state.proteinHigh) : null,
            fatHigh: state.fatHigh ? parseInt(state.fatHigh) : null,
            carbsHigh: state.carbsHigh ? parseInt(state.carbsHigh) : null,
            fiberHigh: state.fiberHigh ? parseInt(state.fiberHigh) : null,
        });
        router.back();
    };

    const handleClear = (event: FormEvent) => {
        event.preventDefault();
        setState({
            calories: macrosQuery.data?.Calories.toFixed(0) ?? '',
            protein: macrosQuery.data?.Protein.toFixed(0) ?? '',
            fat: macrosQuery.data?.Fat.toFixed(0) ?? '',
            carbs: macrosQuery.data?.Carbs.toFixed(0) ?? '',
            fiber: macrosQuery.data?.Fiber.toFixed(0) ?? '',
            caloriesHigh: macrosQuery.data?.CaloriesHigh?.toFixed(0),
            proteinHigh: macrosQuery.data?.ProteinHigh?.toFixed(0),
            fatHigh: macrosQuery.data?.FatHigh?.toFixed(0),
            carbsHigh: macrosQuery.data?.CarbsHigh?.toFixed(0),
            fiberHigh: macrosQuery.data?.FiberHigh?.toFixed(0),
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
                                    inputMode="numeric"
                                    label="Protein"
                                    autoComplete="off"
                                    value={state.protein}
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            protein: event.target.value,
                                        })
                                    }
                                />
                                <TextField
                                    id="proteinHigh"
                                    type="number"
                                    inputMode="numeric"
                                    label="Protein High"
                                    autoComplete="off"
                                    value={state.proteinHigh}
                                    required={false}
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            proteinHigh: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <TextField
                                    id="fat"
                                    type="number"
                                    inputMode="numeric"
                                    label="Fat"
                                    autoComplete="off"
                                    value={state.fat}
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            fat: event.target.value,
                                        })
                                    }
                                />
                                <TextField
                                    id="fatHigh"
                                    type="number"
                                    inputMode="numeric"
                                    label="Fat High"
                                    autoComplete="off"
                                    value={state.fatHigh}
                                    required={false}
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            fatHigh: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <TextField
                                    id="carbs"
                                    type="number"
                                    inputMode="numeric"
                                    label="Carbs"
                                    autoComplete="off"
                                    value={state.carbs}
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            carbs: event.target.value,
                                        })
                                    }
                                />
                                <TextField
                                    id="carbsHigh"
                                    type="number"
                                    inputMode="numeric"
                                    label="Carbs High"
                                    autoComplete="off"
                                    value={state.carbsHigh}
                                    required={false}
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            carbsHigh: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <TextField
                                    id="fiber"
                                    type="number"
                                    inputMode="numeric"
                                    label="Fiber"
                                    autoComplete="off"
                                    value={state.fiber}
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            fiber: event.target.value,
                                        })
                                    }
                                />
                                <TextField
                                    id="fiberHigh"
                                    type="number"
                                    inputMode="numeric"
                                    label="Fiber High"
                                    autoComplete="off"
                                    value={state.fiberHigh}
                                    required={false}
                                    onChange={(event) =>
                                        setState({
                                            ...state,
                                            fiberHigh: event.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="bg-primary-dark dark:bg-background flex justify-between px-4 py-3 text-right sm:px-6">
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
