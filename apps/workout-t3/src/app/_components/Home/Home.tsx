"use client";

import { FC, useState } from "react";
import { MacroGrid } from "~/app/_components/Macros/MacroGrid";
import { LinkButton } from "~/app/_components/Buttons/LinkButton";
import { Todo } from "~/app/_components/Home/Todo";
import { Scanner } from "~/app/_components/Scanner/Scanner";
import { RecommendedNextWorkout } from "~/app/_components/Workout/RecommendedNextWorkout";

export const Home: FC = () => {
  const [openScanner, setOpenScanner] = useState(false);

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <MacroGrid home />
        <div className="flex w-full flex-row justify-between gap-2 pt-2">
          <LinkButton
            className="flex w-full justify-center"
            to={"/eat/add-food"}
          >
            Add Food
          </LinkButton>
          <Scanner
            buttonClassName="flex w-full justify-center"
            open={openScanner}
            setOpen={setOpenScanner}
          />
        </div>
      </div>
      <RecommendedNextWorkout />
      <div className="md:col-span-3">
        <Todo />
      </div>
    </div>
  );
};
