import { FC } from "react";
import { MacroGrid } from "./MacroGrid";
import { FoodGrid } from "../Food/FoodGrid";
import Link from "next/link";

export const Eat: FC = () => {
  return (
    <div className="container">
      <div className="grid w-full grid-cols-1 gap-2">
        <MacroGrid />
        <FoodGrid />
      </div>
      <div className="float-right my-2">
        <Link href="https://platform.fatsecret.com" target="_blank">
          <img
            src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.svg"
            alt="Powered by Fat Secret"
          />
        </Link>
      </div>
    </div>
  );
};
