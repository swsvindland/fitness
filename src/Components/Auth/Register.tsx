import { FC, FormEvent, useState } from 'react';
import { Button } from '../Buttons/Button';
import { TextField } from '../TextFields/TextField';
import { Loading } from '../Loading';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation } from '@tanstack/react-query';
import { auth, createUser, getUser } from '../../api';
import { User } from '../../types/user';
import { Capacitor } from '@capacitor/core';
import { SavePassword } from 'capacitor-ios-autofill-save-password';

interface IProps {
    setUser: (user: User) => void;
    setRegister: (register: boolean) => void;
    setNewUser: (newUser: boolean) => void;
}

export const Register: FC<IProps> = ({ setUser, setRegister, setNewUser }) => {
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
        }
    };

    const loginMutation = useMutation(auth, {
        onSuccess: async (data, variables, context) => {
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
        onSuccess: async (data, variables, context) => {
            setNewUser(true);
            loginMutation.mutate({ email, password });
        },
        onError: (error, variables, context) => {
            setError('Something went wrong');
        },
    });

    const goBack = () => {
        setRegister(false);
    };

    return (
        <main className="flex min-h-screen flex-col justify-center bg-background p-4 align-middle dark:bg-black sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="card py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                                className="h-4 w-4 rounded border-ternary accent-secondary focus:ring-secondary"
                            />
                            <label
                                htmlFor="agree"
                                className="ml-2 block text-sm text-ternary"
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
                                <Loading />
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
