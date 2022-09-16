import { FC, FormEvent } from 'react';
import { Button } from '../Components/Buttons/Button';

interface IProps {
    setRegister: (register: boolean) => void;
}

export const Register: FC<IProps> = ({ setRegister }) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        setRegister(false);
        event.preventDefault();
    };

    return (
        <main className="min-h-screen flex flex-col justify-center align-middle p-4 sm:px-6 lg:px-8 bg-background">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h1>Coming Soon</h1>
                        <Button type="submit">Go Back</Button>
                    </form>
                </div>
            </div>
        </main>
    );
};
