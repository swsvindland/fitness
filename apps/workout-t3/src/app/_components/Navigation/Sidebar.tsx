"use client";

import { FC } from "react";
import { PersonSolid } from "../Icons/PersonSolid";
import { Capsule } from "../Icons/Capsule";
import { Dumbbell } from "../Icons/Dumbbell";
import { Food } from "../Icons/Food";
import { Home } from "../Icons/Home";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isSelected } from "~/app/_components/Navigation/utils";

export const Sidebar: FC = () => {
  const pathname = usePathname();

  const linkStyle = (route: string[]) =>
    `${
      isSelected(pathname, route) ? "text-ternary" : "text-secondary"
    } w-full justify-center inline-block text-center pt-2 pb-1`;

  const iconStyle = (route: string[]) =>
    `${
      isSelected(pathname, route) ? "fill-ternary" : "fill-secondary"
    } tab tab-home block text-xs w-6 h-6 m-auto`;

  return (
    <div className="pl-safe z-20 flex min-h-0 flex-1 flex-col border-gray-200 bg-primary-dark shadow dark:bg-background ">
      <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
        <nav className="mt-16 flex-1 space-y-1 bg-transparent px-2">
          <Link href="/" className={linkStyle(["/"])}>
            <Home className={iconStyle(["/"])} />
            Home
          </Link>
          <Link href="/workout" className={linkStyle(["/workout", "/cardio"])}>
            <Dumbbell className={iconStyle(["/workout", "/cardio"])} />
            Workout
          </Link>

          <Link href="/eat" className={linkStyle(["/eat"])}>
            <Food className={iconStyle(["/eat"])} />
            Eat
          </Link>

          <Link href="/supplements" className={linkStyle(["/supplements"])}>
            <Capsule className={iconStyle(["/supplements"])} />
            Supplements
          </Link>

          <Link href="/body" className={linkStyle(["/body"])}>
            <PersonSolid className={iconStyle(["/body"])} />
            Body
          </Link>

          <Link href="/settings" className={linkStyle(["/body"])}>
            <PersonSolid className={iconStyle(["/body"])} />
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
};
