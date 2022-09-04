import { FC, FormEvent, useContext, useState } from 'react';
import { TextField } from '../TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import axios, { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../Auth/Auth';
import { useHistory } from 'react-router';

export const WeighInForm: FC = () => {
    const [weight, setWeight] = useState<string>('');
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const history = useHistory();

    const addWeight = (): Promise<AxiosResponse<boolean>> => {
        const body = {
            weight: parseInt(weight),
            userId: user?.id,
        };

        return axios.post(
            `${process.env.REACT_APP_API_URL}/api/AddUserWeight`,
            body
        );
    };

    const mutation = useMutation(addWeight, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['UserWeight', user?.id]);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate();
        history.goBack();
    };

    const handleClear = () => {
        setWeight('');
    };

    return (
        <div className="m-4">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded bg-card w-80">
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
                        <div className="px-4 py-3 bg-primary-dark text-right sm:px-6 flex justify-between">
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
