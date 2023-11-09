import { FC, ReactNode } from "react";
import { Sidebar } from "~/_components/Navigation/Sidebar";
import { Header } from "~/_components/Navigation/Header";
import { BottomNavigation } from "~/_components/Navigation/BottomNavigation";
import { auth } from "@clerk/nextjs/server";

interface IProps {
  children: ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
  const { userId } = auth();

  if (!userId) return <>{children}</>;

  return (
    <>
      <div className="min-h-screen bg-background dark:bg-black">
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
      </div>
      <footer className="pb-safe md:hidden">
        <BottomNavigation />
      </footer>
    </>
  );
};