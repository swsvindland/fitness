import { FC, useContext, useEffect } from "react";
import { UserContext } from "~/contexts/UserContext";
import { api } from "~/trpc/react";
import { undefined } from "zod";
import { MacroGrid } from "~/app/_components/Macros/MacroGrid";
import { LinkButton } from "~/app/_components/Buttons/LinkButton";
import { Todo } from "~/app/_components/Home/Todo";

export const Home: FC = () => {
  return (
    <div>
      <MacroGrid home />
      <div className="my-2 flex flex-row justify-between">
        <LinkButton
          className="ml-1 flex w-full justify-center"
          to={"/eat/add-food"}
        >
          Add Food
        </LinkButton>
      </div>
      <Todo />
    </div>
  );
};
