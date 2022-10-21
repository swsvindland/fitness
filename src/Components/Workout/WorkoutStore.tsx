import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WorkoutStoreCard } from './WorkoutStoreCard';
import { Loading } from '../Loading';
import { getWorkouts } from '../../api';

export const WorkoutStore: FC = () => {
    const { data, isLoading } = useQuery(['Workouts'], getWorkouts);

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
