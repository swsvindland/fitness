import { FC, FormEvent, useState } from 'react';
import { Button } from '../Buttons/Button';
import { TextField } from '../TextFields/TextField';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@fitness/api';

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
        <main className="bg-background flex min-h-screen flex-col justify-center p-4 align-middle dark:bg-black sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="card px-4 py-8 shadow sm:rounded-lg sm:px-10">
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
                        {error && <span className="text-error">{error}</span>}
                        {!submitted && (
                            <div>
                                {resetMutation.isLoading ? (
                                    <LoadingSpinner />
                                ) : (
                                    <Button
                                        type="submit"
                                        className="flex w-full justify-center text-center"
                                    >
                                        Reset Password
                                    </Button>
                                )}
                            </div>
                        )}
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
