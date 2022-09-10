import { FC } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Workout } from '../../types/Workout';
import { WorkoutStoreCard } from './WorkoutStoreCard';
import { Loading } from '../Loading';

export const WorkoutStore: FC = () => {
    const getWorkouts = (): Promise<AxiosResponse<Workout[]>> => {
        return axios.get(`${process.env.REACT_APP_API_URL}/api/GetWorkouts`);
    };

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
                    price={item.cost}
                />
            ))}
        </div>
    );
};
