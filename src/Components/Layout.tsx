import { FC, ReactNode } from 'react';
import { Sidebar } from './Navigation/Sidebar';
import { BottomNavigation } from './Navigation/BottomNavigation';
import { Header } from './Navigation/Header';
import { PurchaseAccess } from './PurchaseAccess';

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
                <main className="pt-safe md:ml-48 my-24 p-4 flex justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <PurchaseAccess />
                        {children}
                    </div>
                </main>
            </div>
            <footer className="md:hidden pb-safe">
                <BottomNavigation />
            </footer>
        </>
    );
};
