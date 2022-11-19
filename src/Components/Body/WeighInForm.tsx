import { FC, FormEvent, useContext, useState } from 'react';
import { TextField } from '../TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { useHistory } from 'react-router-dom';
import { addWeight } from '../../api';
import { useShowBackButton } from '../Navigation/headerHooks';

export const WeighInForm: FC = () => {
    useShowBackButton();
    const [weight, setWeight] = useState<string>('');
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const history = useHistory();

    const mutation = useMutation(addWeight, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['UserWeight', user?.id]);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({ weight: parseFloat(weight), userId: user?.id ?? '' });
        history.goBack();
    };

    const handleClear = () => {
        setWeight('');
    };

    return (
        <div className="m-4">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded card w-80">
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
