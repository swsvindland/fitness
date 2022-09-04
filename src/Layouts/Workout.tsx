import { FC, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Auth/Auth';
import { UserWorkout } from '../types/UserWorkout';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../Components/Loading';
import { DoWorkout } from '../Components/Workout/DoWorkout';

export const Workout: FC = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const getUserWorkouts = (): Promise<AxiosResponse<UserWorkout[]>> => {
        const params = {
            userId: user?.id,
        };
        return axios.get(
            `${process.env.REACT_APP_API_URL}/api/GetUserWorkouts`,
            {
                params,
            }
        );
    };

    const userWorkoutsQuery = useQuery(
        ['UserWorkouts', user?.id],
        getUserWorkouts
    );

    if (userWorkoutsQuery.isLoading) {
        return <Loading />;
    }

    const activeWorkouts = userWorkoutsQuery.data?.data.filter(
        (item) => item.active
    );

    if (!activeWorkouts || activeWorkouts.length === 0) {
        navigate('/workout/store', { replace: true });
        return null;
    }

    return (
        <>
            <DoWorkout workoutId={activeWorkouts[0].workoutId} />
        </>
    );
};
