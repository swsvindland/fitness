"use client";

import { FC } from "react";
import { TodoItem } from "./TodoItem";
import { api } from "~/trpc/react";

export const Todo: FC = () => {
  const dashboardQuery = api.dashboard.getTodos.useQuery();

  if (dashboardQuery.isLoading) {
    return (
      <div role="status" className="w-full animate-pulse">
        <h1 className="text-2xl font-bold text-secondary">Onboarding To Do</h1>
        <div className="my-2 h-16 rounded bg-card dark:bg-primary-dark"></div>
        <div className="my-2 h-16 rounded bg-card dark:bg-primary-dark"></div>
        <div className="my-2 h-16 rounded bg-card dark:bg-primary-dark"></div>
        <div className="my-2 h-16 rounded bg-card dark:bg-primary-dark"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (dashboardQuery.data?.done) {
    return null;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-secondary">Onboarding To Do</h1>
      <TodoItem
        name="Add your sex"
        show={dashboardQuery.data?.addSex || false}
        checked={false}
        route="/body/sex"
      />
      <TodoItem
        name="Add your height"
        show={dashboardQuery.data?.addHeight || false}
        checked={false}
        route="/body/height"
      />
      <TodoItem
        name="Daily weigh in"
        show={dashboardQuery.data?.addWeight || false}
        checked={false}
        route="/body/weight"
      />
      <TodoItem
        name="Add supplements to track"
        show={dashboardQuery.data?.addSupplements || false}
        checked={false}
        route="/supplements/all-supplements"
      />
    </div>
  );
};
