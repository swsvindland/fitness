import { FC, FormEvent, useContext, useState } from 'react';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { useHistory } from 'react-router-dom';
import { updateUnits } from '../../api';
import { useShowBackButton } from '../Navigation/headerHooks';
import { Units, User } from '../../types/user';

export const UnitsForm: FC = () => {
    const { user, setUser } = useContext(AuthContext);
    useShowBackButton();
    const [unit, setUnit] = useState<Units>(user?.unit ?? Units.Imperial);
    const queryClient = useQueryClient();
    const history = useHistory();

    const mutation = useMutation(updateUnits, {
        onSuccess: async () => {
            if (user) {
                const newUser: User = { ...user, unit };
                setUser(newUser);
            }
            await queryClient.invalidateQueries(['User', user?.id]);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({ unit });
        history.goBack();
    };

    const handleClear = () => {
        setUnit(user?.unit ?? Units.Imperial);
    };

    return (
        <div className="m-4">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded card w-80">
                        <div className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="imperial"
                                    name="imperial"
                                    type="radio"
                                    checked={unit === Units.Imperial}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setUnit(Units.Imperial);
                                        }
                                    }}
                                    className="h-4 w-4 accent-secondary border-ternary"
                                />
                                <label
                                    htmlFor="sex-male"
                                    className="ml-3 block text-sm font-medium text-ternary"
                                >
                                    Imperial
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="metric"
                                    name="metric"
                                    type="radio"
                                    checked={unit === Units.Metric}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setUnit(Units.Metric);
                                        }
                                    }}
                                    className="h-4 w-4 accent-secondary border-ternary"
                                />
                                <label
                                    htmlFor="sex-female"
                                    className="ml-3 block text-sm font-medium text-ternary"
                                >
                                    Metric
                                </label>
                            </div>
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
