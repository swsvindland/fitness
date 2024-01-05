'use client';

import { FC, FormEvent, MouseEvent, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { api } from '~/trpc/react';

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

    const deleteMutation = api.body.deleteBloodPressure.useMutation({
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

    const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!props.id) return;

        deleteMutation.mutate({ id: props.id });
        props.setOpen(false);
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 py-2">
                <TextField
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
                <TextField
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
                <TextField
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
            <div className="flex justify-between pt-2">
                {props.id && (
                    <SecondaryButton type="button" onClick={handleDelete}>
                        Delete
                    </SecondaryButton>
                )}
                <SecondaryButton type="button" onClick={handleClear}>
                    Clear
                </SecondaryButton>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
};
