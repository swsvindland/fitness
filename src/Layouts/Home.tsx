import { FC, useContext, useEffect } from 'react';
import { LinkButton } from '../Components/Buttons/LinkButton';
import { useQuery } from '@tanstack/react-query';
import { getUserDashboard } from '../api';
import { AuthContext } from '../Auth/Auth';
import { useHideBackButton } from '../Components/Navigation/headerHooks';

export const Home: FC = () => {
    const { user } = useContext(AuthContext);
    useHideBackButton();

    const dashboardQuery = useQuery(['Dashboard', user?.id], () => {
        if (!user) return;
        return getUserDashboard();
    });

    return (
        <div className="w-80 grid grid-cols-1">
            {dashboardQuery.data?.data.addHeight && (
                <LinkButton
                    className="my-2 w-full text-center flex justify-center"
                    to="/body/height"
                >
                    Add Your Height
                </LinkButton>
            )}
            {dashboardQuery.data?.data.addWeight && (
                <LinkButton
                    className="my-2 w-full text-center flex justify-center"
                    to="/body/weight"
                >
                    Daily Weigh In
                </LinkButton>
            )}
            {dashboardQuery.data?.data.addBloodPressure && (
                <LinkButton
                    className="my-2 w-full text-center flex justify-center"
                    to="/body/blood-pressure"
                >
                    Add Your Blood Pressure
                </LinkButton>
            )}
            {dashboardQuery.data?.data.addBodyMeasurement && (
                <LinkButton
                    className="my-2 w-full text-center flex justify-center"
                    to="/workout/body"
                >
                    Add Your Body Measurements
                </LinkButton>
            )}
            {dashboardQuery.data?.data.doWorkout && (
                <LinkButton
                    className="my-2 w-full text-center flex justify-center"
                    to="/workout"
                >
                    Start Your Workout
                </LinkButton>
            )}
        </div>
    );
};
