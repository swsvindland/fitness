import { type FC, type ReactNode } from 'react';
import { SecondaryButton } from './Buttons/SecondaryButton';
import { useHistory } from 'react-router-dom';

interface IProps {
    children: ReactNode;
}

export const GettingStartedLayout: FC<IProps> = ({ children }) => {
    const history = useHistory();
    return (
        <main className="bg-background flex min-h-screen w-screen flex-col items-center justify-center p-4 dark:bg-black">
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
