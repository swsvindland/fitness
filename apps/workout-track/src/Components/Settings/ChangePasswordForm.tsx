import { FC, FormEvent, useContext, useState } from 'react';
import { TextField } from '../TextFields/TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { useHistory } from 'react-router-dom';
import { changePassword } from '@fitness/api-legacy';
import { useShowBackButton } from '../Navigation/headerHooks';
import { Capacitor } from '@capacitor/core';
import { SavePassword } from 'capacitor-ios-autofill-save-password';

interface IState {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    error: string;
}

export const ChangePasswordForm: FC = () => {
    useShowBackButton();
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [state, setState] = useState<IState>({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        error: '',
    });
    const history = useHistory();

    const mutation = useMutation(changePassword, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['User', user?.id]);

            if (Capacitor.getPlatform() === 'ios') {
                await SavePassword.promptDialog({
                    username: user?.email ?? '',
                    password: state.newPassword,
                });
            }

            history.goBack();
        },
        onError: (error) => {
            setState((s) => ({ ...s, error: 'Old Password is incorrect' }));
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (state.newPassword !== state.confirmNewPassword) {
            setState({
                ...state,
                error: 'New passwords do not match',
            });
        } else {
            mutation.mutate({
                oldPassword: state.oldPassword,
                newPassword: state.newPassword,
            });
        }
    };

    const handleClear = () => {
        setState({
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            error: '',
        });
    };

    return (
        <div className="container">
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="card overflow-hidden rounded shadow">
                        <div className="p-4">
                            <TextField
                                id="oldPassword"
                                type="password"
                                label="Old Password"
                                autoComplete="off"
                                value={state.oldPassword}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        oldPassword: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                id="newPassword"
                                type="password"
                                label="New Password"
                                autoComplete="off"
                                value={state.newPassword}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        newPassword: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                id="confirmNewPassword"
                                type="password"
                                label="Confirm New Password"
                                autoComplete="off"
                                value={state.confirmNewPassword}
                                onChange={(event) =>
                                    setState({
                                        ...state,
                                        confirmNewPassword: event.target.value,
                                    })
                                }
                            />
                            {state.error && (
                                <span className="text-error">
                                    {state.error}
                                </span>
                            )}
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
