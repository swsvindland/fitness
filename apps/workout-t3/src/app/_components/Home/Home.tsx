"use client";

import { FC, useState } from "react";
import { MacroGrid } from "~/app/_components/Macros/MacroGrid";
import { LinkButton } from "~/app/_components/Buttons/LinkButton";
import { Todo } from "~/app/_components/Home/Todo";
import { Scanner } from "~/app/_components/Scanner/Scanner";

export const Home: FC = () => {
  const [openScanner, setOpenScanner] = useState(false);

  return (
    <>
      <MacroGrid home />
      <div className="flex w-full flex-row justify-between gap-2 pb-4 pt-2">
        <LinkButton className="flex w-full justify-center" to={"/eat/add-food"}>
          Add Food
        </LinkButton>
        <Scanner
          buttonClassName="flex w-full justify-center"
          open={openScanner}
          setOpen={setOpenScanner}
        />
      </div>
      <Todo />
    </>
  );
};
