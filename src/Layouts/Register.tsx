import { FC, FormEvent, useState } from 'react';
import { Button } from '../Components/Buttons/Button';
import { TextField } from '../Components/TextField';
import { Loading } from '../Components/Loading';
import { SecondaryButton } from '../Components/Buttons/SecondaryButton';
import { useMutation } from '@tanstack/react-query';
import { auth, createUser, getUser } from '../api';
import { User } from '../types/user';

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
        }

        registerMutation.mutate({ email, password });
    };

    const loginMutation = useMutation(auth, {
        onSuccess: async (data, variables, context) => {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('userId', data.data.userId);

            const user = await getUser();
            setUser(user.data);
        },
    });

    const registerMutation = useMutation(createUser, {
        onSuccess: async (data, variables, context) => {
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
        <main className="min-h-screen flex flex-col justify-center align-middle p-4 sm:px-6 lg:px-8 bg-background">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                                    href="https://svindland.dev/terms.html"
                                    className="text-secondary"
                                >
                                    Terms and Conditions
                                </a>{' '}
                                and{' '}
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://svindland.dev/privacy.html"
                                    className="text-secondary"
                                >
                                    Privacy Policy
                                </a>
                            </label>
                        </div>
                        {error && <span className="text-red-500">{error}</span>}
                        <div>
                            {registerMutation.isLoading ? (
                                <Loading />
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full text-center flex justify-center"
                                    disabled={!agree}
                                >
                                    Create Account
                                </Button>
                            )}
                        </div>
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
