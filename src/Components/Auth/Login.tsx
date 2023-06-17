import { type FC, type FormEvent, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { type User } from '../../types/User';
import { Button } from '../Buttons/Button';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { TextField } from '../TextFields/TextField';
import { authV2, getUser, ssoAuthV2 } from '../../api';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { Capacitor } from '@capacitor/core';
import { SavePassword } from 'capacitor-ios-autofill-save-password';
import { Apple } from '../Icons/Apple';
import { Google } from '../Icons/Google';
import {
    getCurrentUser,
    getIdToken,
    signInWithApple,
    signInWithGoogle,
} from '../../utils/auth';

interface IProps {
    setUser: (user?: User) => void;
    setRegister: (register: boolean) => void;
    setForgotPassword: (forgotPassword: boolean) => void;
}

export const Login: FC<IProps> = ({
    setUser,
    setRegister,
    setForgotPassword,
}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | undefined>(undefined);

    const silentLoginQuery = useQuery(
        ['User'],
        async () => {
            const user = await getUser();
            if (user.data) {
                setUser(user.data);
            } else {
                setUser(undefined);
                localStorage.clear();
            }

            return null;
        },
        {
            enabled:
                !!localStorage.getItem('token') &&
                !!localStorage.getItem('userId'),
            retry: 1,
        }
    );

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
        onError: () => {
            setError('Username or password is incorrect');
        },
    });

    const ssoMutation = useMutation(ssoAuthV2, {
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

    const handleGoogleSignIn = async () => {
        await signInWithGoogle();

        const userIdToken = await getIdToken();
        const user = await getCurrentUser();

        if (!user?.email) return;
        if (!userIdToken) return;

        ssoMutation.mutate({
            email: user.email,
            token: userIdToken,
        });
    };

    const handleAppleSignIn = async () => {
        await signInWithApple();

        const userIdToken = await getIdToken();
        const user = await getCurrentUser();

        if (!user?.email) return;
        if (!userIdToken) return;

        ssoMutation.mutate({
            email: user.email,
            token: userIdToken,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginMutation.mutate({ email, password });
    };

    const handleRegister = () => {
        setRegister(true);
    };

    const handleForgotPassword = () => {
        setForgotPassword(true);
    };

    if (silentLoginQuery.isFetching || ssoMutation.isLoading) {
        return (
            <main className="flex min-h-screen flex-col justify-center bg-background p-4 align-middle dark:bg-black sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="card px-4 py-8 sm:px-10">
                        <LoadingSpinner />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col justify-center bg-background p-4 align-middle dark:bg-black sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="card px-4 py-8 sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            label="Email Address"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value )
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
                                setPassword(event.target.value )
                            }
                        />
                        {error && (
                            <span className="text-center text-red-500">
                                {error}
                            </span>
                        )}
                        <div>
                            {loginMutation.isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <Button
                                    type="submit"
                                    className="flex w-full justify-center text-center"
                                >
                                    Sign In
                                </Button>
                            )}
                        </div>
                        <div>
                            <SecondaryButton
                                onClick={handleRegister}
                                className="flex w-full justify-center text-center"
                            >
                                Register
                            </SecondaryButton>
                        </div>
                        <div>
                            <button
                                onClick={handleForgotPassword}
                                className="flex w-full justify-center text-center text-secondary"
                            >
                                Forgot Password
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4">
                    {Capacitor.getPlatform() === 'ios' ? (
                        <Button
                            className="flex w-full justify-center text-center"
                            onClick={handleAppleSignIn}
                        >
                            <Apple className="mr-2 w-4 fill-secondary" /> Sign
                            In with Apple
                        </Button>
                    ) : null}
                    {Capacitor.getPlatform() === 'android' ? (
                        <Button
                            className="flex w-full justify-center text-center"
                            onClick={handleGoogleSignIn}
                        >
                            <Google className="mr-2 w-4 fill-secondary" /> Sign
                            In with Google
                        </Button>
                    ) : null}
                </div>
            </div>
        </main>
    );
};
