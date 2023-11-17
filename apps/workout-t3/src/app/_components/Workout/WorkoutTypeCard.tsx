import { WorkoutType } from "@fitness/types";
import { FC } from "react";
import Link from "next/link";

interface WorkoutTypeCardProps {
  workoutType: WorkoutType;
}

export const WorkoutTypeCard: FC<WorkoutTypeCardProps> = ({ workoutType }) => {
  return (
    <li
      key={workoutType}
      className="card col-span-1 w-full divide-y divide-gray-200"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-ternary" />
            <h3 className="truncate text-sm font-medium text-secondary">
              {workoutType}
            </h3>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-ternary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
          eveniet magnam necessitatibus obcaecati voluptas voluptatem! Alias
          architecto at cum deserunt laborum libero sint sit.
        </p>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <Link
              href={`/workout/store`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm text-ternary"
            >
              Change Workout
            </Link>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <Link
              href={`/workout/${workoutType.toString().toLowerCase()}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm text-ternary"
            >
              Start Workout
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};
