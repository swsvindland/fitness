'use client';

import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { api } from '~/trpc/react';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

interface IProps {
    id: number | null;
    date: string;
    body: IBody | null;
    setOpen: () => void;
}

export interface IBody {
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

const initialState: IBody = {
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

export const BodyForm: FC<IProps> = (props) => {
    const [state, setState] = useState<IBody>(props.body ?? initialState);
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

        props.setOpen();
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
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <Input
                    id="neck"
                    name="neck"
                    type="number"
                    inputMode="decimal"
                    label="Neck"
                    value={state.neck}
                    onChange={handleChange}
                    tabIndex={1}
                />
                <Input
                    id="shoulders"
                    name="shoulders"
                    type="number"
                    inputMode="decimal"
                    label="Shoulders"
                    value={state.shoulders}
                    onChange={handleChange}
                />
                <Input
                    id="chest"
                    name="chest"
                    type="number"
                    inputMode="decimal"
                    label="Chest"
                    value={state.chest}
                    onChange={handleChange}
                />
                <div className="flex flex-row justify-between gap-2">
                    <Input
                        id="leftBicep"
                        name="leftBicep"
                        type="number"
                        inputMode="decimal"
                        label="Left Bicep"
                        value={state.leftBicep}
                        onChange={handleChange}
                    />
                    <Input
                        id="rightBicep"
                        name="rightBicep"
                        type="number"
                        inputMode="decimal"
                        label="Right Bicep"
                        value={state.rightBicep}
                        onChange={handleChange}
                    />
                </div>
                <Input
                    id="navel"
                    name="navel"
                    type="number"
                    inputMode="decimal"
                    label="Navel"
                    value={state.navel}
                    onChange={handleChange}
                />
                <Input
                    id="waist"
                    name="waist"
                    type="number"
                    inputMode="decimal"
                    label="Waist"
                    value={state.waist}
                    onChange={handleChange}
                />
                <Input
                    id="hip"
                    name="hip"
                    type="number"
                    inputMode="decimal"
                    label="Hip"
                    value={state.hip}
                    onChange={handleChange}
                />
                <div className="flex flex-row justify-between gap-2">
                    <Input
                        id="leftThigh"
                        name="leftThigh"
                        type="number"
                        inputMode="decimal"
                        label="Left Thigh"
                        value={state.leftThigh}
                        onChange={handleChange}
                    />
                    <Input
                        id="rightThigh"
                        name="rightThigh"
                        type="number"
                        inputMode="decimal"
                        label="Right Thigh"
                        value={state.rightThigh}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-row justify-between gap-2">
                    <Input
                        id="leftCalf"
                        name="leftCalf"
                        type="number"
                        inputMode="decimal"
                        label="Left Calf"
                        value={state.leftCalf}
                        onChange={handleChange}
                    />
                    <Input
                        id="rightCalf"
                        name="rightCalf"
                        type="number"
                        inputMode="decimal"
                        label="Right Calf"
                        value={state.rightCalf}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-between py-2">
                    <Button color="warning" onPress={handleClear}>
                        Clear
                    </Button>
                    <Button color="primary" type="submit">
                        Save
                    </Button>
                </div>
            </div>
        </form>
    );
};
