import { FC, ReactNode, useContext } from 'react';
import { AuthContext } from './Auth/Auth';
import { SecondaryButton } from './Buttons/SecondaryButton';
import { useHistory } from 'react-router-dom';

interface IProps {
    children: ReactNode;
}

export const GettingStartedLayout: FC<IProps> = ({ children }) => {
    const history = useHistory();
    return (
        <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-background p-4 dark:bg-black">
            {children}
            <SecondaryButton
                onClick={() => {
                    history.push('/');
                    window.location.reload();
                }}
                className="max-w-lg"
            >
                Skip Setup
            </SecondaryButton>
        </main>
    );
};
