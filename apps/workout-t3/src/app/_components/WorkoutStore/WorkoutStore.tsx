import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { WorkoutStoreCard } from "./WorkoutStoreCard";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { getWorkouts, getWorkoutsByUserId } from "@fitness/api-legacy";
import { LinkButton } from "../Buttons/LinkButton";

export const WorkoutStore: FC = () => {
  const workoutsQuery = useQuery(["Workouts"], getWorkouts);
  const customWorkoutsQuery = useQuery(
    ["WorkoutsByUserId"],
    getWorkoutsByUserId,
  );

  if (workoutsQuery.isLoading || customWorkoutsQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container flex flex-col">
      {(customWorkoutsQuery.data?.data.length ?? 0) > 0 && (
        <h2 className="text-lg text-secondary">Your Custom Workouts</h2>
      )}
      <LinkButton to="/workout/create" className="m-4">
        Create New Custom Workout (beta)
      </LinkButton>
      {customWorkoutsQuery.data?.data.map((item) => (
        <WorkoutStoreCard
          key={item.id}
          id={item.id}
          name={item.name}
          custom={true}
        />
      ))}
      {(customWorkoutsQuery.data?.data.length ?? 0) > 0 && (
        <h2 className="text-lg text-secondary">Workouts</h2>
      )}
      {workoutsQuery.data?.data.map((item) => (
        <WorkoutStoreCard
          key={item.id}
          id={item.id}
          name={item.name}
          custom={false}
        />
      ))}
    </div>
  );
};
