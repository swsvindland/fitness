import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
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
    const [loading, setLoading] = useState<boolean>(false);

    const silentLogin = useCallback(async () => {
        setLoading(true);
        const user = await getUser();
        setUser(user.data);
        setLoading(false);
    }, [setUser]);

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('userId')) {
            silentLogin();
        }
    }, [silentLogin]);

    const loginMutation = useMutation(auth, {
        onSuccess: async (data, variables, context) => {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('userId', data.data.userId);

            const user = await getUser();
            setUser(user.data);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginMutation.mutate({ email, password });
    };

    const handleRegister = () => {
        setRegister(true);
    };

    if (loading) {
        return (
            <main className="min-h-screen flex flex-col justify-center align-middle p-4 sm:px-6 lg:px-8 bg-background">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Loading />
                    </div>
                </div>
            </main>
        );
    }

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
                        <div>
                            {loginMutation.isLoading ? (
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
                            <SecondaryButton
                                onClick={handleRegister}
                                className="w-full text-center flex justify-center"
                            >
                                Register
                            </SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};
