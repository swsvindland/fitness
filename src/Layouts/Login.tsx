import { FC, FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { User } from '../types/user';
import { Button } from '../Components/Buttons/Button';
import { Loading } from '../Components/Loading';
import { TextField } from '../Components/TextField';
import { auth, createUser, getUser } from '../api';
import { SecondaryButton } from '../Components/Buttons/SecondaryButton';

interface IProps {
    setUser: (user: User) => void;
    setRegister: (register: boolean) => void;
}

export const Login: FC<IProps> = ({ setUser, setRegister }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const authMutation = useMutation(auth, {
        onSuccess: async (data, variables, context) => {
            await loginMutation.mutate(email);
        },
    });

    const loginMutation = useMutation(getUser, {
        onSuccess: async (data, variables, context) => {
            setUser(data.data);
        },
    });

    const registerMutation = useMutation(createUser, {
        onSuccess: async (data, variables, context) => {},
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        authMutation.mutate({ email, password });
    };

    const handleRegister = () => {
        setRegister(true);
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
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="password"
                            label="Password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-secondary"
                                >
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <div>
                            {loginMutation.isLoading ||
                            authMutation.isLoading ? (
                                <Loading />
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full text-center flex justify-center"
                                >
                                    Sign In
                                </Button>
                            )}
                        </div>
                        <div>
                            {registerMutation.isLoading ? (
                                <Loading />
                            ) : (
                                <SecondaryButton
                                    onClick={handleRegister}
                                    className="w-full text-center flex justify-center"
                                >
                                    Register
                                </SecondaryButton>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};
