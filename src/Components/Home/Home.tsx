import { FC, useContext } from 'react';
import { LinkButton } from '../Buttons/LinkButton';
import { useQuery } from '@tanstack/react-query';
import { getUserDashboard } from '../../api';
import { AuthContext } from '../Auth/Auth';
import { useHideBackButton } from '../Navigation/headerHooks';
import { PurchaseAccess } from '../Purchase/PurchaseAccess';

export const Home: FC = () => {
    const { user } = useContext(AuthContext);
    useHideBackButton();

    const dashboardQuery = useQuery(['Dashboard', user?.id], () => {
        if (!user) return;
        return getUserDashboard();
    });

    return (
        <div className="w-80 grid grid-cols-1">
            <h2 className="text-ternary text-center">
                Interactive dashboard. You will see your daily actions here. If
                it is empty, congrats you have done everything for today!
            </h2>
            {!user?.paid && (
                <PurchaseAccess
                    body="Get access to all workouts, macro tracking, and more!"
                    button="Get Access"
                />
            )}
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
            {dashboardQuery.data?.data.addBodyMeasurements && (
                <LinkButton
                    className="my-2 w-full text-center flex justify-center"
                    to="/body/body"
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
