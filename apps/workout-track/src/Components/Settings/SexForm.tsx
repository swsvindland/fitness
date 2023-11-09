import { FC, FormEvent, useContext, useState } from 'react';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { useHistory } from 'react-router-dom';
import { updateSex } from '@fitness/api-legacy';
import { useShowBackButton } from '../Navigation/headerHooks';
import { Sex, User } from '@fitness/types';

export const SexForm: FC = () => {
    const { user, setUser } = useContext(AuthContext);
    useShowBackButton();
    const [sex, setSex] = useState<Sex>(user?.sex ?? Sex.Unknown);
    const queryClient = useQueryClient();
    const history = useHistory();

    const mutation = useMutation(updateSex, {
        onSuccess: async () => {
            if (user) {
                const newUser: User = { ...user, sex };
                setUser(newUser);
            }
            await queryClient.invalidateQueries(['User', user?.id]);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate({ sex });
        history.goBack();
    };

    const handleClear = () => {
        setSex(user?.sex ?? Sex.Unknown);
    };

    return (
        <div className="container">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="card overflow-hidden rounded shadow">
                        <div className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="sex-male"
                                    name="sex-male"
                                    type="radio"
                                    checked={sex === Sex.Male}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSex(Sex.Male);
                                        }
                                    }}
                                    className="border-ternary accent-secondary h-4 w-4"
                                />
                                <label
                                    htmlFor="sex-male"
                                    className="text-ternary ml-3 block text-sm font-medium"
                                >
                                    Male
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="sex-female"
                                    name="sex-female"
                                    type="radio"
                                    checked={sex === Sex.Female}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSex(Sex.Female);
                                        }
                                    }}
                                    className="border-ternary accent-secondary h-4 w-4"
                                />
                                <label
                                    htmlFor="sex-female"
                                    className="text-ternary ml-3 block text-sm font-medium"
                                >
                                    Female
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
