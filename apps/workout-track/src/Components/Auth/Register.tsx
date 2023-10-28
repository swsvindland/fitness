import { FC, FormEvent, useState } from 'react';
import { Button } from '../Buttons/Button';
import { TextField } from '../TextFields/TextField';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation } from '@tanstack/react-query';
import { authV2, createUser, getUser } from '@fitness/api';
import { User } from '@fitness/types';
import { Capacitor } from '@capacitor/core';
import { SavePassword } from 'capacitor-ios-autofill-save-password';

interface IProps {
    setUser: (user: User) => void;
    setRegister: (register: boolean) => void;
}

export const Register: FC<IProps> = ({ setUser, setRegister }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [error, setError] = useState<string | undefined>(undefined);
    const [agree, setAgree] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(undefined);

        if (password !== passwordConfirm) {
            setError('Passwords do not match');
        } else {
            registerMutation.mutate({ email, password });
            setRegister(false);
        }
    };

    const loginMutation = useMutation(authV2, {
        onSuccess: async (data) => {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('userId', data.data.userId);

            if (Capacitor.getPlatform() === 'ios') {
                await SavePassword.promptDialog({
                    username: email,
                    password: password,
                });
            }

            const user = await getUser();
            setUser(user.data);
        },
    });

    const registerMutation = useMutation(createUser, {
        onSuccess: async () => {
            loginMutation.mutate({ email, password });
            setRegister(false);
        },
        onError: () => {
            setError('Something went wrong');
        },
    });

    const goBack = () => {
        setRegister(false);
    };

    return (
        <main className="bg-background flex min-h-screen flex-col justify-center p-4 align-middle dark:bg-black sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="card px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            label="Email Address"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value as string)
                            }
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="password"
                            label="Password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value as string)
                            }
                        />
                        <TextField
                            id="password-confirm"
                            name="password-confirm"
                            type="password"
                            autoComplete="password"
                            label="Confirm Password"
                            value={passwordConfirm}
                            onChange={(event) =>
                                setPasswordConfirm(event.target.value as string)
                            }
                        />
                        <div className="flex items-center">
                            <input
                                id="agree"
                                name="agree"
                                type="checkbox"
                                checked={agree}
                                onChange={(event) => {
                                    setAgree(event.target.checked);
                                }}
                                className="border-ternary accent-secondary focus:ring-secondary h-4 w-4 rounded"
                            />
                            <label
                                htmlFor="agree"
                                className="text-ternary ml-2 block text-sm"
                            >
                                Agree to{' '}
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://workout-track.com/terms"
                                    className="text-secondary"
                                >
                                    Terms and Conditions
                                </a>{' '}
                                and{' '}
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://workout-track.com/privacy"
                                    className="text-secondary"
                                >
                                    Privacy Policy
                                </a>
                            </label>
                        </div>
                        {error && <span className="text-error">{error}</span>}
                        <div>
                            {registerMutation.isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <Button
                                    type="submit"
                                    className="flex w-full justify-center text-center"
                                    disabled={!agree}
                                >
                                    Create Account
                                </Button>
                            )}
                        </div>
                        <div>
                            <SecondaryButton
                                onClick={goBack}
                                className="flex w-full justify-center text-center"
                            >
                                Go Back
                            </SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};
