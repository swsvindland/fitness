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
        <div>
            <header>
                <Header />
            </header>
            <div className="flex flex-row">
                <div>
                    <Sidebar />
                </div>
                <main className="flex min-h-full w-full justify-center rounded-lg bg-zinc-800 p-4">
                    <div className="flex flex-1 flex-col items-center justify-center ">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
