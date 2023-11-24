'use client';

import { FC, FormEvent, useState } from 'react';
import { TextField } from '../../TextFields/TextField';
import { Button } from '../../Buttons/Button';
import { SecondaryButton } from '../../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBloodPressure } from '@fitness/api-legacy';
import { useRouter } from 'next/navigation';

interface IState {
    systolic: string;
    diastolic: string;
}

export const BloodPressureCheckInForm: FC = () => {
    const userId = localStorage.getItem('userId') ?? '';
    const queryClient = useQueryClient();
    const [state, setState] = useState<IState>({ systolic: '', diastolic: '' });
    const router = useRouter();

    const mutation = useMutation(addBloodPressure, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['UserBloodPressure']);
            await queryClient.invalidateQueries(['Dashboard']);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({
            userId,
            systolic: parseInt(state.systolic),
            diastolic: parseInt(state.diastolic),
        });
        router.back();
    };

    const handleClear = () => {
        setState({ systolic: '', diastolic: '' });
    };

    return (
        <div className="container">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="card overflow-hidden rounded shadow">
                        <div className="p-4">
                            <TextField
                                id="systolic"
                                type="number"
                                inputMode="decimal"
                                label="Systolic"
                                autoComplete="off"
                                value={state.systolic}
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
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        diastolic: event.target.value,
                                    })
                                }
                            />
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
