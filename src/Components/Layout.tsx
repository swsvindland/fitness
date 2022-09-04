import { FC, ReactNode } from 'react';
import {Sidebar} from "./Navigation/Sidebar";
import {BottomNavigation} from "./Navigation/BottomNavigation";

interface IProps {
    children: ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
    return (
        <>
            <header></header>
            <main className="bg-background min-h-screen py-4">
                <div className="hidden md:flex md:w-48 md:flex-col md:fixed md:inset-y-0">
                    <Sidebar />
                </div>
                <div className="md:ml-48 p-4 flex justify-center">
                    {children}
                </div>
            </main>
            <footer className="md:hidden pt-16">
                <BottomNavigation />
            </footer>
        </>
    );
};
