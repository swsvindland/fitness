import axios, { AxiosResponse } from 'axios';
import { Supplement } from './types/supplement';
import { UserSupplement } from './types/userSupplement';
import { UserBodyFat } from './types/UserBodyFat';
import { Workout } from './types/Workout';
import { WorkoutBlock } from './types/WorkoutBlock';

export const getUser = (email: string) => {
    const params = { email };
    return axios.get(`${process.env.REACT_APP_API_URL}/api/GetUser`, {
        params,
    });
};

export const getAllSupplements = (): Promise<AxiosResponse<Supplement[]>> => {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/GetAllSupplements`);
};

export const getUserSupplements = (
    userId: string
): Promise<AxiosResponse<UserSupplement[]>> => {
    const params = {
        userId,
    };

    return axios.get(
        `${process.env.REACT_APP_API_URL}/api/GetUserSupplements`,
        {
            params,
        }
    );
};

export const getUserBodyFat = (
    userId: string
): Promise<AxiosResponse<UserBodyFat[]>> => {
    const params = {
        userId,
    };

    return axios.get(`${process.env.REACT_APP_API_URL}/api/GetUserBodyFat`, {
        params,
    });
};

export const getWorkout = (
    workoutId: number
): Promise<AxiosResponse<Workout>> => {
    const params = {
        workoutId,
    };
    return axios.get(`${process.env.REACT_APP_API_URL}/api/GetWorkout`, {
        params,
    });
};

export const getWorkoutDetails = (
    workoutId: number
): Promise<AxiosResponse<WorkoutBlock[]>> => {
    const params = {
        workoutId,
    };
    return axios.get(`${process.env.REACT_APP_API_URL}/api/GetWorkoutDetails`, {
        params,
    });
};
