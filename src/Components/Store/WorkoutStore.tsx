import { FC, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WorkoutStoreCard } from './WorkoutStoreCard';
import { Loading } from '../Loading';
import { getUserWorkouts, getWorkouts, getWorkoutsByUserId } from '../../api';
import { HeaderContext } from '../Navigation/HeaderContext';
import { PurchaseAccess } from '../Purchase/PurchaseAccess';
import { AuthContext } from '../Auth/Auth';
import { LinkButton } from '../Buttons/LinkButton';

export const WorkoutStore: FC = () => {
    const { setGoBack } = useContext(HeaderContext);
    const { user } = useContext(AuthContext);
    const workoutsQuery = useQuery(['Workouts'], getWorkouts);
    const customWorkoutsQuery = useQuery(
        ['WorkoutsByUserId', user?.id],
        getWorkoutsByUserId
    );

    const userWorkoutsQuery = useQuery(['UserWorkouts'], getUserWorkouts);

    useEffect(() => {
        if (userWorkoutsQuery.data?.data.length === 0) {
            setGoBack(false);
        } else {
            setGoBack(true);
        }
    });

    if (workoutsQuery.isLoading || customWorkoutsQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="container flex flex-col">
            {!user?.paid && (
                <PurchaseAccess
                    body="Get access to all workouts, macro tracking, and more!"
                    button="Get Access"
                />
            )}
            {(customWorkoutsQuery.data?.data.length ?? 0) > 0 && (
                <h2 className="text-lg text-secondary">Your Custom Workouts</h2>
            )}
            <LinkButton to="/workout/create" className="m-4">
                Create New Custom Workout (beta)
            </LinkButton>
            {customWorkoutsQuery.data?.data.map((item) => (
                <WorkoutStoreCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    premium={false}
                    custom={true}
                />
            ))}
            {(customWorkoutsQuery.data?.data.length ?? 0) > 0 && (
                <h2 className="text-lg text-secondary">Workouts</h2>
            )}
            {workoutsQuery.data?.data.map((item) => (
                <WorkoutStoreCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    premium={item.premium}
                    custom={false}
                />
            ))}
        </div>
    );
};
