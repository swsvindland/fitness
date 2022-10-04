import { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';
import { TextField } from '../TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../Auth/Auth';
import { useHistory } from 'react-router';
import { API_URL } from '../../api';

interface IState {
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
    const [state, setState] = useState<IState>(initialState);
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const history = useHistory();

    const addBody = (): Promise<AxiosResponse<boolean>> => {
        const body = {
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
            userId: user?.id,
        };

        return axios.post(`${API_URL}/api/AddUserBody`, body);
    };

    const mutation = useMutation(addBody, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['UserBody', user?.id]);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate();
        history.goBack();
    };

    const handleBack = () => {
        setState(initialState);
        history.goBack();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="m-4">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded bg-card w-80">
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
                        <div className="px-4 py-3 bg-primary-dark text-right sm:px-6 flex justify-between">
                            <SecondaryButton onClick={handleBack}>
                                Go Back
                            </SecondaryButton>
                            <Button type="submit">Save</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
