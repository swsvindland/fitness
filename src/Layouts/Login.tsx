import { FC, FormEvent, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { User } from '../types/user';
import { Button } from '../Components/Buttons/Button';
import { Loading } from '../Components/Loading';
import { TextField } from '../Components/TextField';
import { getUser } from '../api';

interface IProps {
    setUser: (user: User) => void;
}

export const Login: FC<IProps> = ({ setUser }) => {
    const [email, setEmail] = useState<string>('');

    const mutation = useMutation(getUser, {
        onSuccess: (data, variables, context) => {
            localStorage.setItem('email', email);
            setUser(data.data);
        },
    });

    useEffect(() => {
        const oldEmail = localStorage.getItem('email');

        if (oldEmail) {
            setEmail(oldEmail);
            mutation.mutate(oldEmail);
        }
    }, [mutation]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate(email);
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
                            label="Email Address"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
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
                            {mutation.isLoading ? (
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
                    </form>
                </div>
            </div>
        </main>
    );
};
