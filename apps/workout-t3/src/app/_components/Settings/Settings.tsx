import { FC } from "react";
import { LinkButton } from "../Buttons/LinkButton";
import { RestartWorkout } from "../Workout/RestartWorkout";
import { DeleteAccount } from "~/app/_components/Settings/DeleteAccount";

export const Settings: FC = () => {
  return (
    <div className="container flex flex-col">
      <h1 className="mb-2 text-secondary">Settings</h1>
      <LinkButton to="/settings/units" className="mb-2">
        Change Units
      </LinkButton>
      <LinkButton to="/body/sex" className="mb-2">
        Change Sex
      </LinkButton>
      <LinkButton to="/eat/custom-macros" className="mb-2">
        Set Custom Macros
      </LinkButton>
      <LinkButton to="/workout/store" className="mb-2">
        Change Workout
      </LinkButton>
      <RestartWorkout />
      <DeleteAccount />
    </div>
  );
};
