import { FC, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

export const GettingStartedLayout: FC<IProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background dark:bg-black">
            <main className="my-24 flex justify-center p-4 pt-safe md:ml-48">
                {children}
            </main>
        </div>
    );
};
