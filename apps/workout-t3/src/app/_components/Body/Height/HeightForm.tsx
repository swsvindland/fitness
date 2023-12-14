'use client';

import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SecondaryButton } from '~/app/_components/Buttons/SecondaryButton';
import { Button } from '~/app/_components/Buttons/Button';
import { TextField } from '~/app/_components/TextFields/TextField';
import { api } from '~/trpc/react';

export const HeightForm: FC = () => {
    const [height, setHeight] = useState<string>('');
    const router = useRouter();
    const utils = api.useUtils();

    const mutation = api.body.addHeight.useMutation({
        onSuccess: async () => {
            await utils.body.invalidate();
            await utils.dashboard.invalidate();
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({ height: parseFloat(height) });
        router.back();
    };

    const handleClear = () => {
        setHeight('');
    };

    return (
        <div className="m-4">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="card w-80 overflow-hidden rounded shadow">
                        <div className="p-4">
                            <TextField
                                id="height"
                                type="number"
                                inputMode="decimal"
                                label="Height"
                                value={height}
                                onChange={(event) =>
                                    setHeight(event.target.value)
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
