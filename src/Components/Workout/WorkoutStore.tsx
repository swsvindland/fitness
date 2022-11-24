import { FC, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WorkoutStoreCard } from './WorkoutStoreCard';
import { Loading } from '../Loading';
import { getUserWorkouts, getWorkouts } from '../../api';
import { HeaderContext } from '../Navigation/HeaderContext';

export const WorkoutStore: FC = () => {
    const { setGoBack } = useContext(HeaderContext);
    const { data, isLoading } = useQuery(['Workouts'], getWorkouts);

    const userWorkoutsQuery = useQuery(['UserWorkouts'], getUserWorkouts);

    useEffect(() => {
        if (userWorkoutsQuery.data?.data.length === 0) {
            setGoBack(false);
        } else {
            setGoBack(true);
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            {data?.data.map((item) => (
                <WorkoutStoreCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    version={item.version}
                />
            ))}
        </div>
    );
};
