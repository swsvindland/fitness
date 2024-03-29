'use client';

import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { TextField } from '../../TextFields/TextField';
import { Button } from '../../Buttons/Button';
import { SecondaryButton } from '../../Buttons/SecondaryButton';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

export interface IBodyState {
    neck: string;
    shoulders: string;
    chest: string;
    leftBicep: string;
    rightBicep: string;
    navel: string;
    waist: string;
    hip: string;
    leftThigh: string;
    rightThigh: string;
    leftCalf: string;
    rightCalf: string;
}

const initialState = {
    neck: '',
    shoulders: '',
    chest: '',
    leftBicep: '',
    rightBicep: '',
    navel: '',
    waist: '',
    hip: '',
    leftThigh: '',
    rightThigh: '',
    leftCalf: '',
    rightCalf: '',
};

export const BodyCheckInForm: FC = () => {
    const [state, setState] = useState<IBodyState>(initialState);
    const router = useRouter();
    const utils = api.useUtils();

    const mutation = api.body.addBody.useMutation({
        onSuccess: async () => {
            await utils.body.invalidate();
            await utils.dashboard.invalidate();
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({
            neck: parseFloat(state.neck),
            shoulders: parseFloat(state.shoulders),
            chest: parseFloat(state.chest),
            leftBicep: parseFloat(state.leftBicep),
            rightBicep: parseFloat(state.rightBicep),
            navel: parseFloat(state.navel),
            waist: parseFloat(state.waist),
            hip: parseFloat(state.hip),
            leftThigh: parseFloat(state.leftThigh),
            rightThigh: parseFloat(state.rightThigh),
            leftCalf: parseFloat(state.leftCalf),
            rightCalf: parseFloat(state.rightCalf),
        });

        router.back();
    };

    const handleClear = () => {
        setState(initialState);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="container">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="card mb-8 overflow-hidden rounded shadow">
                        <div className="p-4">
                            <TextField
                                id="neck"
                                name="neck"
                                type="number"
                                inputMode="decimal"
                                label="Neck"
                                value={state.neck}
                                onChange={handleChange}
                            />
                            <TextField
                                id="shoulders"
                                name="shoulders"
                                type="number"
                                inputMode="decimal"
                                label="Shoulders"
                                value={state.shoulders}
                                onChange={handleChange}
                            />
                            <TextField
                                id="chest"
                                name="chest"
                                type="number"
                                inputMode="decimal"
                                label="Chest"
                                value={state.chest}
                                onChange={handleChange}
                            />
                            <div className="flex flex-row justify-between">
                                <TextField
                                    id="leftBicep"
                                    name="leftBicep"
                                    type="number"
                                    inputMode="decimal"
                                    label="Left Bicep"
                                    value={state.leftBicep}
                                    onChange={handleChange}
                                />
                                <TextField
                                    id="rightBicep"
                                    name="rightBicep"
                                    type="number"
                                    inputMode="decimal"
                                    label="Right Bicep"
                                    value={state.rightBicep}
                                    onChange={handleChange}
                                />
                            </div>
                            <TextField
                                id="navel"
                                name="navel"
                                type="number"
                                inputMode="decimal"
                                label="Navel"
                                value={state.navel}
                                onChange={handleChange}
                            />
                            <TextField
                                id="waist"
                                name="waist"
                                type="number"
                                inputMode="decimal"
                                label="Waist"
                                value={state.waist}
                                onChange={handleChange}
                            />
                            <TextField
                                id="hip"
                                name="hip"
                                type="number"
                                inputMode="decimal"
                                label="Hip"
                                value={state.hip}
                                onChange={handleChange}
                            />
                            <div className="flex flex-row justify-between">
                                <TextField
                                    id="leftThigh"
                                    name="leftThigh"
                                    type="number"
                                    inputMode="decimal"
                                    label="Left Thigh"
                                    value={state.leftThigh}
                                    onChange={handleChange}
                                />
                                <TextField
                                    id="rightThigh"
                                    name="rightThigh"
                                    type="number"
                                    inputMode="decimal"
                                    label="Right Thigh"
                                    value={state.rightThigh}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-row justify-between">
                                <TextField
                                    id="leftCalf"
                                    name="leftCalf"
                                    type="number"
                                    inputMode="decimal"
                                    label="Left Calf"
                                    value={state.leftCalf}
                                    onChange={handleChange}
                                />
                                <TextField
                                    id="rightCalf"
                                    name="rightCalf"
                                    type="number"
                                    inputMode="decimal"
                                    label="Right Calf"
                                    value={state.rightCalf}
                                    onChange={handleChange}
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
