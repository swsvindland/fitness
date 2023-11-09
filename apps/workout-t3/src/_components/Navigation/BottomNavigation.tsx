"use client";

import { FC } from "react";
import { PersonSolid } from "../Icons/PersonSolid";
import { Food } from "../Icons/Food";
import { Dumbbell } from "../Icons/Dumbbell";
import { Capsule } from "../Icons/Capsule";
import { Home } from "../Icons/Home";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isSelected } from "~/_components/Navigation/utils";

export const BottomNavigation: FC = () => {
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
    <div
      id="bottom-navigation"
      className="fixed inset-x-0 bottom-0 z-10 block bg-primary-dark pb-6 shadow dark:bg-background"
    >
      <div id="tabs" className="flex justify-between">
        <Link href="/" className={linkStyle(["/"])}>
          <Home className={iconStyle(["/"])} />
          <span className="tab tab-home block text-xs">Home</span>
        </Link>
        <Link href="/workout" className={linkStyle(["/workout", "/cardio"])}>
          <Dumbbell className={iconStyle(["/workout", "/cardio"])} />
          <span className="tab tab-home block text-xs">Workout</span>
        </Link>
        <Link href="/eat" className={linkStyle(["/eat"])}>
          <Food className={iconStyle(["/eat"])} />
          <span className="tab tab-home block text-xs">Eat</span>
        </Link>
        <Link href="/supplements" className={linkStyle(["/supplements"])}>
          <Capsule className={iconStyle(["/supplements"])} />
          <span className="tab tab-home block text-xs">Supplements</span>
        </Link>
        <Link href="/body" className={linkStyle(["/body"])}>
          <PersonSolid className={iconStyle(["/body"])} />
          <span className="tab tab-home block text-xs">Body</span>
        </Link>
      </div>
    </div>
  );
};
