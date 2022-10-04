import { FC, FormEvent, useContext, useState } from 'react';
import { TextField } from '../TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../Auth/Auth';
import { useHistory } from 'react-router';
import { API_URL } from '../../api';

export const HeightForm: FC = () => {
    const [height, setHeight] = useState<string>('');
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const history = useHistory();

    const addHeight = (): Promise<AxiosResponse<boolean>> => {
        const body = {
            height: parseInt(height),
            userId: user?.id,
        };

        return axios.post(`${API_URL}/api/AddUserHeight`, body);
    };

    const mutation = useMutation(addHeight, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['UserHeight', user?.id]);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate();
        history.goBack();
    };

    const handleBack = () => {
        setHeight('');
        history.goBack();
    };

    return (
        <div className="m-4">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded bg-card w-80">
                        <div className="p-4">
                            <TextField
                                id="height"
                                type="number"
                                inputMode="decimal"
                                label="Height In Inches"
                                value={height}
                                onChange={(event) =>
                                    setHeight(event.target.value)
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
