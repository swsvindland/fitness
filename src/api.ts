import axios, { AxiosResponse } from 'axios';
import { Supplement } from './types/supplement';
import { UserSupplement } from './types/userSupplement';
import { UserBodyFat } from './types/UserBodyFat';
import { Workout } from './types/Workout';
import { WorkoutBlock } from './types/WorkoutBlock';
import { UserWorkoutsCompleted } from './types/UserWorkoutsCompleted';
import { EdamamFood } from './types/EdamamFood';
import { EdamamFoodDetails } from './types/EdamamFoodDetails';
import { Macros } from './types/Macros';
import { UserFood } from './types/UserFood';

export const auth = (body: { email: string; password: string }) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/Auth`, body);
};

export const getUser = (email: string) => {
    const params = { email };
    return axios.get(`${process.env.REACT_APP_API_URL}/api/GetUser`, {
        params,
    });
};

export const createUser = (email: string) => {
    const body = { email };
    return axios.post(`${process.env.REACT_APP_API_URL}/api/CreateUser`, body);
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

export const completeWorkout = (body: {
    userId: string;
    workoutId: number;
    workoutBlock: number;
    week: number;
    day: number;
}): Promise<AxiosResponse> => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/api/AddUserWorkoutCompleted`,
        body
    );
};

export const getUserNextWorkout = (
    userId: string
): Promise<AxiosResponse<UserWorkoutsCompleted>> => {
    const params = {
        userId,
    };

    return axios.get(`${process.env.REACT_APP_API_URL}/api/GetNextWorkout`, {
        params,
    });
};

export const foodAutocomplete = (
    query: string
): Promise<AxiosResponse<string[]>> => {
    const params = {
        query,
    };
    return axios.get(`${process.env.REACT_APP_API_URL}/api/AutocompleteFood`, {
        params,
    });
};

export const searchFood = (
    query: string,
    barcode?: string
): Promise<AxiosResponse<EdamamFood[]>> => {
    const params = {
        query,
        barcode,
    };
    return axios.get(`${process.env.REACT_APP_API_URL}/api/ParseFood`, {
        params,
    });
};

export const getFoodDetails = (
    foodId: string
): Promise<AxiosResponse<EdamamFoodDetails>> => {
    const params = {
        foodId,
    };
    return axios.get(`${process.env.REACT_APP_API_URL}/api/GetFoodDetails`, {
        params,
    });
};

export const getUserFoods = (
    userId: string
): Promise<AxiosResponse<UserFood[]>> => {
    const params = {
        userId,
    };
    return axios.get(`${process.env.REACT_APP_API_URL}/api/GetUserFoods`, {
        params,
    });
};

export const getMacros = (userId: string): Promise<AxiosResponse<Macros[]>> => {
    const params = {
        userId,
    };

    return axios.get(`${process.env.REACT_APP_API_URL}/api/GetMacros`, {
        params,
    });
};

export const getCurrentUserMacros = (
    userId: string
): Promise<AxiosResponse<Macros>> => {
    const params = {
        userId,
    };
    return axios.get(
        `${process.env.REACT_APP_API_URL}/api/GetCurrentUserMacros`,
        {
            params,
        }
    );
};

export const addUserFood = (userFood: UserFood): Promise<AxiosResponse> => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/api/AddUserFood`,
        userFood
    );
};
