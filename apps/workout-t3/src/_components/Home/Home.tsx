import { FC, useContext, useEffect } from "react";
import { UserContext } from "~/contexts/UserContext";
import { api } from "~/trpc/react";
import { undefined } from "zod";
import { MacroGrid } from "~/_components/Macros/MacroGrid";
import { LinkButton } from "~/_components/Buttons/LinkButton";
import { Todo } from "~/_components/Home/Todo";

export const Home: FC = () => {
  const { user, setUser } = useContext(UserContext);

  const userQuery = api.user.getUser.useQuery();

  useEffect(() => {
    if (!user && userQuery.data) {
      setUser({
        created: userQuery.data.Created.toISOString(),
        lastLogin: userQuery.data.LastLogin?.toISOString(),
        paid: true,
        sex: Number(userQuery.data.Sex),
        unit: Number(userQuery.data.Unit),
        userRole: 0,
        id: userQuery.data.Id,
        email: userQuery.data.Email,
      });
    }
  }, []);

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
