'use client';

import { FC, FormEvent, useState } from 'react';
import { TextField } from '../../TextFields/TextField';
import { Button } from '../../Buttons/Button';
import { SecondaryButton } from '../../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addWeight } from '@fitness/api-legacy';
import { useRouter } from 'next/navigation';

export const WeighInForm: FC = () => {
    const userId = localStorage.getItem('userId') ?? '';
    const [weight, setWeight] = useState<string>('');
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation(addWeight, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['UserWeight']);
            await queryClient.invalidateQueries(['Dashboard']);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({ weight: parseFloat(weight), userId });
        router.back();
    };

    const handleClear = () => {
        setWeight('');
    };

    return (
        <div className="container">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="card overflow-hidden rounded shadow">
                        <div className="p-4">
                            <TextField
                                id="weight"
                                type="number"
                                inputMode="decimal"
                                label="Weight"
                                value={weight}
                                onChange={(event) =>
                                    setWeight(event.target.value)
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
