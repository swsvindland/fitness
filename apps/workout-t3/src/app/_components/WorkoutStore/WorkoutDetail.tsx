"use client";

import { FC } from "react";
import { Button } from "../Buttons/Button";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

interface IProps {
  workoutId: number;
}

export const WorkoutDetail: FC<IProps> = ({ workoutId }) => {
  const router = useRouter();
  const utils = api.useUtils();

  const workoutQuery = api.store.getWorkout.useQuery({ workoutId });
  const mutation = api.store.buyWorkout.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      router.push("/workout");
    },
  });

  if (workoutQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="card rounded">
      <div className="py-6">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="mb-2 text-xl font-medium text-secondary">
                  {workoutQuery.data?.Name}
                </h1>
              </div>
            </div>
            <div className="lg:col-span-5">
              {mutation.isLoading ? (
                <LoadingSpinner />
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    mutation.mutate({ workoutId });
                  }}
                >
                  <Button
                    type="submit"
                    className="mt-6 flex w-full justify-center text-center"
                  >
                    Start Workout
                  </Button>
                </form>
              )}
              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-secondary">
                  Description
                </h2>

                <div className="prose prose-sm mt-4 text-ternary">
                  {workoutQuery.data?.Description && (
                    <p>{workoutQuery.data?.Description}</p>
                  )}
                </div>
              </div>

              <div className="mt-8 border-t pt-8 text-secondary">
                <h2 className="text-sm font-medium text-secondary">
                  Workout Details
                </h2>

                <div className="prose prose-sm mt-4 text-ternary">
                  <div role="list">
                    <li>{workoutQuery.data?.Days} days per week</li>
                    <li>{workoutQuery.data?.Duration} weeks long</li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
