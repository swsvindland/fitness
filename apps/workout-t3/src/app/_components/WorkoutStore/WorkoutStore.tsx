"use client";

import { FC } from "react";
import { WorkoutStoreCard } from "./WorkoutStoreCard";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { LinkButton } from "../Buttons/LinkButton";
import { api } from "~/trpc/react";

export const WorkoutStore: FC = () => {
  const workoutsQuery = api.store.getResistanceWorkouts.useQuery();
  const customWorkoutsQuery = api.store.getCustomWorkouts.useQuery();

  if (workoutsQuery.isLoading || customWorkoutsQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container flex flex-col">
      {(customWorkoutsQuery.data?.length ?? 0) > 0 && (
        <h2 className="text-lg text-secondary">Your Custom Workouts</h2>
      )}
      <LinkButton to="/workout/create" className="m-4">
        Create New Custom Workout (beta)
      </LinkButton>
      {customWorkoutsQuery.data?.map((item) => (
        <WorkoutStoreCard
          key={item.Id}
          id={item.Id}
          name={item.Name}
          custom={true}
        />
      ))}
      {(customWorkoutsQuery.data?.length ?? 0) > 0 && (
        <h2 className="text-lg text-secondary">Workouts</h2>
      )}
      {workoutsQuery.data?.map((item) => (
        <WorkoutStoreCard
          key={item.Id}
          id={item.Id}
          name={item.Name}
          custom={false}
        />
      ))}
    </div>
  );
};
