'use client';

import { format } from 'date-fns';
import { TextField } from '../../TextFields/TextField';
import { LoadingSpinner } from '../../Loading/LoadingSpinner';
import { CircleCheckSolid } from '../../Icons/CircleCheckSolid';
import { ChangeEvent, FC, useState } from 'react';
import { CircleXMark } from '../../Icons/CircleXMark';
import { UserBody } from '@fitness/types';
import { api } from '~/trpc/react';

interface IProps {
    id: number;
    date: string;
    neck: number;
    shoulders: number;
    chest: number;
    leftBicep: number;
    rightBicep: number;
    navel: number;
    waist: number;
    hip: number;
    leftThigh: number;
    rightThigh: number;
    leftCalf: number;
    rightCalf: number;
}

export const AllBodyCard: FC<IProps> = (props) => {
    const { id, date, ...defaultBody } = props;
    const [bodyState, setBodyState] = useState<UserBody>({
        id,
        ...defaultBody,
    });
    const [saved, setSaved] = useState<boolean>(false);
    const utils = api.useUtils();

    const updateMutation = api.body.updateBody.useMutation({
        onSuccess: () => {
            setSaved(true);
        },
    });

    const deleteMutation = api.body.deleteBody.useMutation({
        onSuccess: async () => {
            await utils.body.invalidate();
        },
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBodyState({
            ...bodyState,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="card my-2 p-4">
            <span className="text-secondary text-lg">
                {format(new Date(date ?? ''), 'PP')}
            </span>
            <hr className="border-secondary" />
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <div className="flex flex-1 p-2">
                        <TextField
                            id={`user-neck-${date}`}
                            label="Neck"
                            value={bodyState.neck}
                            type="number"
                            inputMode="decimal"
                            name="neck"
                            onChange={handleChange}
                            className="my-auto"
                        />
                    </div>
                    <div className="flex flex-1 p-2">
                        <TextField
                            id={`user-shoulders-${date}`}
                            label="Shoulders"
                            value={bodyState.shoulders}
                            type="number"
                            inputMode="decimal"
                            name="shoulders"
                            onChange={handleChange}
                            className="my-auto"
                        />
                    </div>
                    <div className="flex flex-1 p-2">
                        <TextField
                            id={`user-chest-${date}`}
                            label="Chest"
                            value={bodyState.chest}
                            type="number"
                            inputMode="decimal"
                            name="chest"
                            onChange={handleChange}
                            className="my-auto"
                        />
                    </div>
                    <div className="flex flex-1  p-2">
                        <TextField
                            id={`user-navel-${date}`}
                            label="Navel"
                            value={bodyState.navel}
                            type="number"
                            inputMode="decimal"
                            name="navel"
                            onChange={handleChange}
                            className="my-auto"
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-1 p-2">
                        <TextField
                            id={`user-left-bicep-${date}`}
                            label="Left Bicep"
                            value={bodyState.leftBicep}
                            type="number"
                            inputMode="decimal"
                            name="leftBicep"
                            onChange={handleChange}
                            className="my-auto"
                        />
                    </div>
                    <div className="flex flex-1  p-2">
                        <TextField
                            id={`user-right-bicep-${date}`}
                            label="Right Bicep"
                            value={bodyState.rightBicep}
                            type="number"
                            inputMode="decimal"
                            name="rightBicep"
                            onChange={handleChange}
                            className="my-auto"
                        />
                    </div>
                    <div className="flex flex-1 p-2">
                        <TextField
                            id={`user-waist-${date}`}
                            label="Waist"
                            value={bodyState.waist}
                            type="number"
                            inputMode="decimal"
                            name="waist"
                            onChange={handleChange}
                            className="my-auto"
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-1 p-2">
                        <TextField
                            id={`user-hip-${date}`}
                            label="Hip"
                            value={bodyState.hip}
                            type="number"
                            inputMode="decimal"
                            name="hip"
                            onChange={handleChange}
                            className="my-auto"
                        />
                    </div>
                    <div className="flex flex-1 p-2">
                        <TextField
                            id={`user-left-thigh-${date}`}
                            label="Left Thigh"
                            value={bodyState.leftThigh}
                            type="number"
                            inputMode="decimal"
                            name="leftThigh"
                            onChange={handleChange}
                            className="my-auto"
                        />
                    </div>
                    <div className="flex flex-1 p-2">
                        <TextField
                            id={`user-right-thigh-${date}`}
                            label="Right Thigh"
                            value={bodyState.rightThigh}
                            type="number"
                            inputMode="decimal"
                            name="rightThigh"
                            onChange={handleChange}
                            className="my-auto"
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-1 p-2">
                        <TextField
                            id={`user-left-calf-${date}`}
                            label="Left Calf"
                            value={bodyState.leftCalf}
                            type="number"
                            inputMode="decimal"
                            name="leftCalf"
                            onChange={handleChange}
                            className="my-auto"
                        />
                    </div>
                    <div className="flex flex-1 p-2">
                        <TextField
                            id={`user-right-calf-${date}`}
                            label="Right Calf"
                            value={bodyState.rightCalf}
                            type="number"
                            inputMode="decimal"
                            name="rightCalf"
                            onChange={handleChange}
                            className="my-auto"
                        />
                    </div>
                    <div className="mt-4 flex flex-1 items-center justify-center p-2">
                        <button
                            className="mr-8 h-8 w-8"
                            onClick={() => {
                                updateMutation.mutate({
                                    ...bodyState,
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
