import { FC, FormEvent, useContext, useState } from 'react';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { useHistory } from 'react-router-dom';
import { updateUnits } from '@fitness/api';
import { useShowBackButton } from '../Navigation/headerHooks';
import { Units, User } from '@fitness/types';

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
        <div className="container">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <p className="text-ternary mb-4 text-center">
                    It is recommended that you do not change once you add a
                    bunch of data. It will not update past data entry, just how
                    labels and certain computations, such as body fat, are
                    computed
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="card overflow-hidden rounded shadow">
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
                                    className="border-ternary accent-secondary h-4 w-4"
                                />
                                <label
                                    htmlFor="sex-male"
                                    className="text-ternary ml-3 block text-sm font-medium"
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
                                    className="border-ternary accent-secondary h-4 w-4"
                                />
                                <label
                                    htmlFor="sex-female"
                                    className="text-ternary ml-3 block text-sm font-medium"
                                >
                                    Metric
                                </label>
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
