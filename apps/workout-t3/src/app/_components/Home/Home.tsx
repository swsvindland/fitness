import { FC } from "react";
import { MacroGrid } from "~/app/_components/Macros/MacroGrid";
import { LinkButton } from "~/app/_components/Buttons/LinkButton";
import { Todo } from "~/app/_components/Home/Todo";

export const Home: FC = () => {
  return (
    <>
      <MacroGrid home />
      <div className="flex w-full flex-row justify-between pb-4 pt-2">
        <LinkButton className="flex w-full justify-center" to={"/eat/add-food"}>
          Add Food
        </LinkButton>
      </div>
      <Todo />
    </>
  );
};
