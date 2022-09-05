import { FC, FormEvent, useContext, useState } from 'react';
import { TextField } from '../TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../Auth/Auth';
import { useHistory } from 'react-router';

interface IState {
    systolic: string;
    diastolic: string;
}

export const BloodPressureCheckInForm: FC = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [state, setState] = useState<IState>({ systolic: '', diastolic: '' });
    const history = useHistory();

    const addBloodPressure = (): Promise<AxiosResponse<boolean>> => {
        const body = {
            systolic: parseInt(state.systolic),
            diastolic: parseInt(state.diastolic),
            userId: user?.id,
        };

        return axios.post(
            `${process.env.REACT_APP_API_URL}/api/AddUserBloodPressure`,
            body
        );
    };

    const mutation = useMutation(addBloodPressure, {
        onSuccess: async () => {
            await queryClient.invalidateQueries([
                'UserBloodPressure',
                user?.id,
            ]);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate();
        history.goBack();
    };

    const handleBack = () => {
        setState({ systolic: '', diastolic: '' });
        history.goBack();
    };

    return (
        <div className="m-4">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded bg-card w-80">
                        <div className="p-4">
                            <TextField
                                id="systolic"
                                type="number"
                                inputMode="decimal"
                                label="Systolic"
                                autocomplete="off"
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
                                autocomplete="off"
                                value={state.diastolic}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        diastolic: event.target.value,
                                    })
                                }
                            />
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
