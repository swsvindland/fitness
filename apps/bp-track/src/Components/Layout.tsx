import { FC, ReactNode } from 'react';
import { Sidebar } from './Navigation/Sidebar';
import { BottomNavigation } from './Navigation/BottomNavigation';
import { Header } from './Navigation/Header';

interface IProps {
    children: ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
    return (
        <>
            <div className="min-h-screen bg-background dark:bg-black">
                <div className="hidden md:fixed md:inset-y-0 md:flex md:w-48 md:flex-col">
                    <Sidebar />
                </div>
                <header className="md:ml-48">
                    <Header />
                </header>
                <main className="my-24 flex justify-center p-4 pt-safe md:ml-48 lg:px-24">
                    <div
                        className="flex flex-1 flex-col items-center justify-center"
                    >
                        {children}
                    </div>
                </main>
            </div>
            <footer className="pb-safe md:hidden">
                <BottomNavigation />
            </footer>
        </>
    );
};
