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
            <div className="bg-background dark:bg-black min-h-screen">
                <div className="hidden md:flex md:w-48 md:flex-col md:fixed md:inset-y-0">
                    <Sidebar />
                </div>
                <header className="md:ml-48">
                    <Header />
                </header>
                <main className="md:ml-48 my-24 p-4 flex justify-center">
                    {children}
                </main>
            </div>
            <footer className="md:hidden footer">
                <BottomNavigation />
            </footer>
        </>
    );
};
