import { FC, FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { User } from '../types/user';
import { Button } from '../Components/Buttons/Button';
import { Loading } from '../Components/Loading';
import { TextField } from '../Components/TextField';
import { createUser, getUser } from '../api';
import { getPasskeyCredential } from '../utils/passkey/authenticate/getPasskeyCredential';
import validatePassKeyCreation from '../utils/passkey/register/validatePassKeyCreation';
import { CreatePassKeyCredential } from '../utils/passkey/register/createPasskeyCredential';
import { SecondaryButton } from '../Components/Buttons/SecondaryButton';

interface IProps {
    setUser: (user: User) => void;
}

export const Login: FC<IProps> = ({ setUser }) => {
    const [email, setEmail] = useState<string>('');

    const loginMutation = useMutation(getUser, {
        onSuccess: async (data, variables, context) => {
            await performLogin(data.data);
        },
    });

    const registerMutation = useMutation(createUser, {
        onSuccess: async (data, variables, context) => {
            await createPassKey(data.data);
        },
    });

    const createPassKey = async (user: User) => {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // MARK: THIS SHOULD BE DONE ON THE BACKEND
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // const userId = generateRandomString(16);
        console.log('✅  Created userId : ', user.id);
        // const challengeBufferString = generateRandomString(16);
        console.log('✅ Created challengeBufferString : ', user.challenge);
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        /* MARK: THIS SHOULD BE DONE IF AN ACCOUNT IS VALID
                 AND THE CHALLENGE BUFFER AND USERID SHOULD BE PASSED
                 FROM THE RETURN CALL IN THE SERVER
        */
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        try {
            const credential = await CreatePassKeyCredential(
                email.toLowerCase(),
                user.challenge,
                user.id
            );

            console.log('✅ Created Pass Key Credential ! ');

            if (credential) {
                // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // MARK: THIS SHOULD BE DONE ON THE BACKEND
                // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                console.log('✅ Credential is not null : ', credential);
                // Validate PassKey Creation
                const challenge = validatePassKeyCreation(credential);
                switch (challenge) {
                    case null:
                        console.log('❌ PassKey verification failed.');
                        return;
                    default:
                        console.log(
                            '✅ PassKey verification passed with challenge : ',
                            challenge
                        );
                        // Save the user account data.
                        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        // MARK: THIS SHOULD BE SAVED TO YOUR BACKEND DATABASE
                        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        setUser(user);
                        break;
                }
            } else {
                console.log('❌ Credential does not exist.');
            }
        } catch (error) {
            console.log('❌ Error creating credential');
            // Session Timed Out
            console.log('ERROR : ', error);
        }
    };

    const performLogin = async (user: User) => {
        console.log('⚈ ⚈ ⚈ performLogin ⚈ ⚈ ⚈');
        try {
            const credential = await getPasskeyCredential(user.challenge);
            console.log(' performLogin ✅ credential : ', credential);
            setUser(user);
            return credential;
        } catch (error) {
            console.log(
                'performLogin ❌  Failed to get credential with error : ',
                error
            );
            return null;
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginMutation.mutate(email);
    };

    const handleRegister = () => {
        registerMutation.mutate(email);
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
                            {loginMutation.isLoading ? (
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
