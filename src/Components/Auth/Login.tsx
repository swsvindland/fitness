import { FC, FormEvent, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from '../../types/user';
import { Button } from '../Buttons/Button';
import { Loading } from '../Loading';
import { TextField } from '../TextField';
import { auth, getUser } from '../../api';
import { SecondaryButton } from '../Buttons/SecondaryButton';

interface IProps {
    setUser: (user?: User) => void;
    setRegister: (register: boolean) => void;
}

export const Login: FC<IProps> = ({ setUser, setRegister }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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
        },
        {
            enabled:
                !!localStorage.getItem('token') &&
                !!localStorage.getItem('userId'),
        }
    );

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

    if (silentLoginQuery.isFetching) {
        return (
            <main className="min-h-screen flex flex-col justify-center align-middle p-4 sm:px-6 lg:px-8 bg-background dark:bg-black">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="card py-8 px-4 sm:px-10">
                        <Loading />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col justify-center align-middle p-4 sm:px-6 lg:px-8 bg-background dark:bg-black">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="card py-8 px-4 sm:px-10">
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
