import { FC, FormEvent, useContext, useState } from 'react';
import { TextField } from '../TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { useHistory } from 'react-router-dom';
import { addHeight } from '../../api';
import { useShowBackButton } from '../Navigation/headerHooks';
import { Units } from '../../types/user';

export const HeightForm: FC = () => {
    useShowBackButton();
    const [height, setHeight] = useState<string>('');
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const history = useHistory();

    const mutation = useMutation(addHeight, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['UserHeight', user?.id]);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({ height: parseFloat(height), userId: user?.id ?? '' });
        history.goBack();
    };

    const handleClear = () => {
        setHeight('');
    };

    return (
        <div className="m-4">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded card w-80">
                        <div className="p-4">
                            <TextField
                                id="height"
                                type="number"
                                inputMode="decimal"
                                label={
                                    user?.unit === Units.Imperial
                                        ? 'Height In Inches'
                                        : 'Height In Centimeters'
                                }
                                value={height}
                                onChange={(event) =>
                                    setHeight(event.target.value)
                                }
                            />
                        </div>
                        <div className="px-4 py-3 bg-primary-dark dark:bg-background text-right sm:px-6 flex justify-between">
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
