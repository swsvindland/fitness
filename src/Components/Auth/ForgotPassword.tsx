import { FC, FormEvent, useState } from 'react';
import { Button } from '../Buttons/Button';
import { TextField } from '../TextField';
import { Loading } from '../Loading';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation } from '@tanstack/react-query';
import { auth, createUser, forgotPassword, getUser } from '../../api';
import { User } from '../../types/user';
import { Capacitor } from '@capacitor/core';
import { SavePassword } from 'capacitor-ios-autofill-save-password';

interface IProps {
    setForgotPassword: (forgotPassword: boolean) => void;
}

export const ForgotPassword: FC<IProps> = ({ setForgotPassword }) => {
    const [email, setEmail] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        resetMutation.mutate(email);
    };

    const resetMutation = useMutation(forgotPassword, {
        onSuccess: async (data, variables, context) => {
            setSubmitted(true);
            setError(undefined);
        },
        onError: (error, variables, context) => {
            setError('Something went wrong');
        },
    });

    const goBack = () => {
        setForgotPassword(false);
    };

    return (
        <main className="min-h-screen flex flex-col justify-center align-middle p-4 sm:px-6 lg:px-8 bg-background dark:bg-black">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="card py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!submitted ? (
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
                        ) : (
                            <div className="text-center">
                                <span className="text-secondary">
                                    If this email exists, you will receive an
                                    email with your new temporary password. Use
                                    that to login, and then remember to go to
                                    setting and change password to update
                                </span>
                            </div>
                        )}
                        {error && <span className="text-red-500">{error}</span>}
                        {!submitted && (
                            <div>
                                {resetMutation.isLoading ? (
                                    <Loading />
                                ) : (
                                    <Button
                                        type="submit"
                                        className="w-full text-center flex justify-center"
                                    >
                                        Reset Password
                                    </Button>
                                )}
                            </div>
                        )}
                        <div>
                            <SecondaryButton
                                onClick={goBack}
                                className="w-full text-center flex justify-center"
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
