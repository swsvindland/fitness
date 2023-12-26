'use client';

import { FC } from 'react';
import { TodoItem } from './TodoItem';
import { api } from '~/trpc/react';

export const Todo: FC = () => {
    const dashboardQuery = api.dashboard.getTodos.useQuery();

    if (dashboardQuery.isLoading) {
        return (
            <div role="status" className="w-full ">
                <h1 className="text-secondary text-2xl font-bold">
                    Onboarding To Do
                </h1>
                <div className="bg-card dark:bg-primary-dark my-2 h-16 animate-pulse rounded"></div>
                <div className="bg-card dark:bg-primary-dark my-2 h-16 animate-pulse rounded"></div>
                <div className="bg-card dark:bg-primary-dark my-2 h-16 animate-pulse rounded"></div>
                <div className="bg-card dark:bg-primary-dark my-2 h-16 animate-pulse rounded"></div>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    if (dashboardQuery.data?.done) {
        return null;
    }

    return (
        <div className="w-full">
            <h1 className="text-secondary text-2xl font-bold">
                Onboarding To Do
            </h1>
            <TodoItem
                name="Add your sex"
                show={dashboardQuery.data?.addSex ?? false}
                route="/body/sex"
            />
            <TodoItem
                name="Add your height"
                show={dashboardQuery.data?.addHeight ?? false}
                route="/body/height"
            />
            <TodoItem
                name="Add your weight"
                show={dashboardQuery.data?.addWeight ?? false}
                route="/body/weight"
            />
            <TodoItem
                name="Add your supplements"
                show={dashboardQuery.data?.addSupplements ?? false}
                route="/supplements/all-supplements"
            />
        </div>
    );
};
