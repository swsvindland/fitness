'use client';

import { FC, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { Input, Button } from '@nextui-org/react';

interface IState {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
    fiber: string;
}

interface IProps {
    onClose: () => void;
}

export const CustomMacroForm: FC<IProps> = (props) => {
    const [state, setState] = useState<IState>({
        calories: '',
        protein: '',
        fat: '',
        carbs: '',
        fiber: '',
    });
    const router = useRouter();
    const utils = api.useUtils();

    const macrosQuery = api.macros.getMacros.useQuery();

    const mutation = api.customMacros.createCustomMacros.useMutation({
        onSuccess: async () => {
            await utils.invalidate();
            props.onClose();
        },
    });

    useEffect(() => {
        setState({
            calories: macrosQuery.data?.Calories.toFixed(0) ?? '',
            protein: macrosQuery.data?.Protein.toFixed(0) ?? '',
            fat: macrosQuery.data?.Fat.toFixed(0) ?? '',
            carbs: macrosQuery.data?.Carbs.toFixed(0) ?? '',
            fiber: macrosQuery.data?.Fiber.toFixed(0) ?? '',
        });
    }, [macrosQuery.data]);

    useEffect(() => {
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
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
                <span className="text-secondary">Calories</span>
                <p className="text-ternary">{state.calories}</p>
            </div>
            <Input
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
            <Input
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
            <Input
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
            <Input
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
            <div className="flex justify-between py-2">
                <Button color="warning" onClick={handleClear}>
                    Clear
                </Button>
                <Button color="primary" type="submit">
                    Save
                </Button>
            </div>
        </form>
    );
};
