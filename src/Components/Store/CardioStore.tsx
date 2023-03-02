import { FC, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WorkoutStoreCard } from './WorkoutStoreCard';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { getCardioWorkouts, getWorkoutsByUserId } from '../../api';
import { PurchaseAccess } from '../Purchase/PurchaseAccess';
import { AuthContext } from '../Auth/Auth';
import { LinkButton } from '../Buttons/LinkButton';
import { useShowBackButton } from '../Navigation/headerHooks';

export const CardioStore: FC = () => {
    useShowBackButton();
    const { user } = useContext(AuthContext);
    const cardioWorkoutsQuery = useQuery(['CardioWorkouts'], getCardioWorkouts);
    const customWorkoutsQuery = useQuery(
        ['WorkoutsByUserId', user?.id],
        getWorkoutsByUserId
    );

    if (cardioWorkoutsQuery.isLoading || customWorkoutsQuery.isLoading) {
        return <LoadingSpinner />;
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
            {cardioWorkoutsQuery.data?.data.map((item) => (
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
