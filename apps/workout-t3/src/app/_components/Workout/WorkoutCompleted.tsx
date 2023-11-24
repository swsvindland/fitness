import { FC } from "react";
import { LinkButton } from "../Buttons/LinkButton";
import { RestartWorkout } from "./RestartWorkout";

export const WorkoutCompleted: FC = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-secondary">Workout Completed</h1>
      <p className="text-md text-ternary">
        Congrats on finishing your workout. You can either restart the same
        workout or choose a new one.
      </p>
      <RestartWorkout />
      <LinkButton to="/workout/store" className="my-2">
        Select a New Workout
      </LinkButton>
    </div>
  );
};
