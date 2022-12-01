import { FC, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

export const GettingStartedLayout: FC<IProps> = ({ children }) => {
    return (
        <div className="bg-background dark:bg-black min-h-screen">
            <main className="pt-safe md:ml-48 my-24 p-4 flex justify-center">
                {children}
            </main>
        </div>
    );
};
