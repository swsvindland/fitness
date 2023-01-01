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
        <div className="">
            <h1 className="text-2xl font-bold text-secondary">Todo</h1>
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
