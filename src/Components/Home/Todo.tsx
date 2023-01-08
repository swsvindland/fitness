import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserDashboard } from '../../api';
import { TodoItem } from './TodoItem';
import { Loading } from '../Loading';

export const Todo: FC = () => {
    const dashboardQuery = useQuery(['Dashboard'], () => {
        return getUserDashboard();
    });

    if (dashboardQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="mt-2">
            <h1 className="text-2xl font-bold text-secondary">To Do</h1>
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
                checked={dashboardQuery.data?.data.supplementsTracked || false}
                route="/supplements"
            />
            <TodoItem
                name="Add your blood pressure"
                show={
                    dashboardQuery.data?.data.addBloodPressure ||
                    dashboardQuery.data?.data.bloodPressureAdded ||
                    false
                }
                checked={dashboardQuery.data?.data.bloodPressureAdded || false}
                route="/body/blood-pressure"
            />
            <TodoItem
                name="Add your body measurements"
                show={
                    dashboardQuery.data?.data.addBodyMeasurements ||
                    dashboardQuery.data?.data.bodyMeasurementsAdded ||
                    false
                }
                checked={
                    dashboardQuery.data?.data.bodyMeasurementsAdded || false
                }
                route="/body/body-measurements"
            />
        </div>
    );
};
