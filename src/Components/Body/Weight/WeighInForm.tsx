import { type FC, type FormEvent, useContext, useState } from 'react';
import { TextField } from '../../TextFields/TextField';
import { Button } from '../../Buttons/Button';
import { SecondaryButton } from '../../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../Auth/Auth';
import { useHistory } from 'react-router-dom';
import { addWeight } from '../../../api';
import { useShowBackButton } from '../../Navigation/headerHooks';

export const WeighInForm: FC = () => {
    useShowBackButton();
    const [weight, setWeight] = useState<string>('');
    const { user, newUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const history = useHistory();

    const mutation = useMutation(addWeight, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['UserWeight']);
            await queryClient.invalidateQueries(['Dashboard']);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({ weight: parseFloat(weight), userId: user?.id ?? '' });
        if (newUser) {
            history.push('/getting-started/sex');
        } else {
            history.goBack();
        }
    };

    const handleClear = () => {
        setWeight('');
    };

    return (
        <div className="container">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="card overflow-hidden rounded shadow">
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
                        <div className="flex justify-between bg-primary-dark px-4 py-3 text-right dark:bg-background sm:px-6">
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
