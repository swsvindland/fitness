'use client';

import { FC, FormEvent, MouseEvent, useState } from 'react';
import { api } from '~/trpc/react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/react';

interface IProps {
    id: number | null;
    date: string;
    systolic: number | null;
    diastolic: number | null;
    heartRate: number | null;
    setOpen: (open: boolean) => void;
}

interface IState {
    systolic: string;
    diastolic: string;
    heartRate: string | undefined;
}

export const BloodPressureForm: FC<IProps> = (props) => {
    const [state, setState] = useState<IState>({
        systolic: props.systolic?.toString() ?? '',
        diastolic: props.diastolic?.toString() ?? '',
        heartRate: props.heartRate?.toString(),
    });
    const utils = api.useUtils();

    const createMutation = api.body.addBloodPressure.useMutation({
        onSuccess: async () => {
            await utils.body.invalidate();
            await utils.dashboard.invalidate();
        },
    });

    const updateMutation = api.body.updateBloodPressure.useMutation({
        onSuccess: async () => {
            await utils.body.invalidate();
            await utils.dashboard.invalidate();
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (props.id) {
            updateMutation.mutate({
                id: props.id,
                systolic: parseInt(state.systolic),
                diastolic: parseInt(state.diastolic),
                heartRate: state.heartRate ? parseInt(state.heartRate) : null,
            });
        } else {
            createMutation.mutate({
                systolic: parseInt(state.systolic),
                diastolic: parseInt(state.diastolic),
                heartRate: state.heartRate ? parseInt(state.heartRate) : null,
            });
        }

        props.setOpen(false);
    };

    const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setState({ systolic: '', diastolic: '', heartRate: undefined });
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 py-2">
                <Input
                    id="systolic"
                    type="number"
                    inputMode="decimal"
                    label="Systolic"
                    autoComplete="off"
                    value={state.systolic}
                    required
                    onChange={(event) =>
                        setState({
                            ...state,
                            systolic: event.target.value,
                        })
                    }
                />
                <Input
                    id="diastolic"
                    type="number"
                    inputMode="decimal"
                    label="Diastolic"
                    autoComplete="off"
                    value={state.diastolic}
                    required
                    onChange={(event) =>
                        setState({
                            ...state,
                            diastolic: event.target.value,
                        })
                    }
                />
                <Input
                    id="heart-rate"
                    type="number"
                    inputMode="decimal"
                    label="Heart Rate"
                    autoComplete="off"
                    value={state.heartRate}
                    onChange={(event) =>
                        setState({
                            ...state,
                            heartRate: event.target.value,
                        })
                    }
                />
            </div>
            <div className="flex justify-between pb-3 pt-2">
                <Button type="button" color="warning" onClick={handleClear}>
                    Clear
                </Button>
                <Button type="submit" color="primary">
                    Save
                </Button>
            </div>
        </form>
    );
};
