import { FC, FormEvent, useContext, useState } from 'react';
import { TextField } from '../TextField';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { useHistory } from 'react-router';
import { addBloodPressure, changePassword } from '../../api';
import { useShowBackButton } from '../Navigation/headerHooks';

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
        <div className="m-4">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded bg-card w-80">
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
                                <span className="text-red-500">
                                    {state.error}
                                </span>
                            )}
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
