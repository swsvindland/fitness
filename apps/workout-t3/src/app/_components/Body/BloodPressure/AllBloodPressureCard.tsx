'use client';

import { format } from 'date-fns';
import { TextField } from '../../TextFields/TextField';
import { LoadingSpinner } from '../../Loading/LoadingSpinner';
import { CircleCheckSolid } from '../../Icons/CircleCheckSolid';
import { FC, useState } from 'react';
import { CircleXMark } from '../../Icons/CircleXMark';
import { api } from '~/trpc/react';

interface IProps {
    id: number;
    date: string;
    defaultSystolic: number;
    defaultDiastolic: number;
}

export const AllBloodPressureCard: FC<IProps> = ({
    id,
    date,
    defaultSystolic,
    defaultDiastolic,
}) => {
    const [systolic, setSystolic] = useState<string>(
        defaultSystolic.toString()
    );
    const [diastolic, setDiastolic] = useState<string>(
        defaultDiastolic.toString()
    );
    const [saved, setSaved] = useState<boolean>(false);
    const utils = api.useUtils();

    const updateMutation = api.body.updateBloodPressure.useMutation({
        onSuccess: () => {
            setSaved(true);
        },
    });

    const deleteMutation = api.body.deleteBloodPressure.useMutation({
        onSuccess: async () => {
            await utils.body.invalidate();
        },
    });

    return (
        <div className="card my-2 p-4">
            <span className="text-secondary text-lg">
                {format(new Date(date ?? ''), 'PP')}
            </span>
            <hr className="border-secondary" />
            <div className="flex flex-row">
                <div className="border-secondary flex flex-1 border-r p-2">
                    <TextField
                        id={`user-systolic-${date}`}
                        label="Systolic"
                        value={systolic}
                        type="number"
                        inputMode="decimal"
                        onChange={(event) => {
                            setSystolic(event.target.value);
                        }}
                        className="my-auto"
                    />
                </div>
                <div className="border-secondary flex flex-1 border-r p-2">
                    <TextField
                        id={`user-diastolic-${date}`}
                        label="Diastolic"
                        value={diastolic}
                        type="number"
                        inputMode="decimal"
                        onChange={(event) => {
                            setDiastolic(event.target.value);
                        }}
                        className="my-auto"
                    />
                </div>
                <div className="flex flex-none">
                    <div className="border-secondary inline-flex w-16 flex-1 items-center justify-center border-r py-4 text-sm font-medium">
                        <button
                            className="h-8 w-8"
                            onClick={() => {
                                updateMutation.mutate({
                                    id,
                                    systolic: parseInt(systolic),
                                    diastolic: parseInt(diastolic),
                                });
                            }}
                        >
                            {updateMutation.isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <CircleCheckSolid
                                    className={
                                        saved
                                            ? 'fill-secondary'
                                            : 'border-ternary rounded-full border fill-transparent'
                                    }
                                />
                            )}
                        </button>
                    </div>
                    <div className="inline-flex w-16 flex-1 items-center justify-center py-4 text-sm font-medium">
                        <button
                            className="h-8 w-8"
                            onClick={() => {
                                deleteMutation.mutate({ id });
                            }}
                        >
                            {deleteMutation.isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <CircleXMark className="fill-error" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
