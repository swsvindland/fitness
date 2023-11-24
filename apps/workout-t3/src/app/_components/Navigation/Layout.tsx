import { FC, ReactNode } from 'react';
import { Sidebar } from '~/app/_components/Navigation/Sidebar';
import { Header } from '~/app/_components/Navigation/Header';
import { BottomNavigation } from '~/app/_components/Navigation/BottomNavigation';
import { auth } from '@clerk/nextjs/server';

interface IProps {
    children: ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
    const { userId } = auth();

    if (!userId) return <>{children}</>;

    return (
        <>
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-28 md:flex-col">
                <Sidebar />
            </div>
            <header className="md:ml-48">
                <Header />
            </header>
            <main className="pt-safe my-16 flex justify-center p-4 md:ml-28 lg:px-16">
                <div className="flex flex-1 flex-col items-center justify-center">
                    {children}
                </div>
            </main>
            <footer className="pb-safe md:hidden">
                <BottomNavigation />
            </footer>
        </>
    );
};
