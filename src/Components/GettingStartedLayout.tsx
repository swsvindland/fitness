import { FC, ReactNode } from 'react';
import { Sidebar } from './Navigation/Sidebar';
import { BottomNavigation } from './Navigation/BottomNavigation';
import { Header } from './Navigation/Header';

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
