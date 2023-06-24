import { type FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserDashboard } from '../../api';
import { TodoItem } from './TodoItem';

export const Todo: FC = () => {
    const dashboardQuery = useQuery(['Dashboard'], () => {
        return getUserDashboard();
    });

    if (dashboardQuery.isLoading) {
        return (
            <div role="status" className="w-full animate-pulse">
                <h1 className="text-2xl font-bold">To Do</h1>
                <div className="my-2 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900"></div>
                <div className="my-2 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900"></div>
                <div className="my-2 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900"></div>
                <div className="my-2 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900"></div>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-secondary text-2xl font-bold">To Do</h1>
            <TodoItem
                name="Add your sex"
                show={dashboardQuery.data?.data.addSex || false}
                checked={false}
                route="/body/sex"
            />
            <TodoItem
                name="Track your macros"
                show={
                    dashboardQuery.data?.data.trackMacros ||
                    dashboardQuery.data?.data.macrosAdded ||
                    false
                }
                checked={dashboardQuery.data?.data.macrosAdded || false}
                route="/eat"
            />
            <TodoItem
                name="Start a workout"
                show={
                    dashboardQuery.data?.data.doWorkout ||
                    dashboardQuery.data?.data.workoutAdded ||
                    false
                }
                checked={dashboardQuery.data?.data.workoutAdded || false}
                route="/workout"
            />
            <TodoItem
                name="Add your height"
                show={
                    dashboardQuery.data?.data.addHeight ||
                    dashboardQuery.data?.data.heightAdded ||
                    false
                }
                checked={dashboardQuery.data?.data.heightAdded || false}
                route="/body/height"
            />
            <TodoItem
                name="Daily weigh in"
                show={
                    dashboardQuery.data?.data.addWeight ||
                    dashboardQuery.data?.data.weightAdded ||
                    false
                }
                checked={dashboardQuery.data?.data.weightAdded || false}
                route="/body/weight"
            />
            <TodoItem
                name="Add supplements to track"
                show={
                    dashboardQuery.data?.data.addSupplements ||
                    dashboardQuery.data?.data.supplementsAdded ||
                    false
                }
                checked={dashboardQuery.data?.data.supplementsAdded || false}
                route="/supplements/all-supplements"
            />
            <TodoItem
                name="Take your supplements"
                show={
                    dashboardQuery.data?.data.trackSupplements ||
                    dashboardQuery.data?.data.supplementsTracked ||
                    false
                }
                checked={
                    (!dashboardQuery.data?.data.addSupplements &&
                        dashboardQuery.data?.data.supplementsTracked) ||
                    false
                }
                route="/supplements"
            />
            <TodoItem
                name="Check In"
                show={
                    dashboardQuery.data?.data.addCheckIn ||
                    dashboardQuery.data?.data.checkInAdded ||
                    false
                }
                checked={dashboardQuery.data?.data.checkInAdded || false}
                route="/home/check-in"
            />
        </div>
    );
};
