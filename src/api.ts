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
import { UserFoodGridItem } from './types/UserFoodGridItem';
import { Dashboard } from './types/Dashboard';
import { UserNextWorkout } from './types/UserNextWorkout';

export const API_URL = 'http://localhost:7071';
// export const API_URL = 'https://fitness-dev.azurewebsites.net';

export const auth = (body: { email: string; password: string }) => {
    return axios.post(`${API_URL}/api/Auth`, body);
};

export const getUser = (email: string) => {
    const params = { email };
    return axios.get(`${API_URL}/api/GetUser`, {
        params,
    });
};

export const createUser = (email: string) => {
    const body = { email };
    return axios.post(`${API_URL}/api/CreateUser`, body);
};

export const getAllSupplements = (): Promise<AxiosResponse<Supplement[]>> => {
    return axios.get(`${API_URL}/api/GetAllSupplements`);
};

export const getUserSupplements = (
    userId: string
): Promise<AxiosResponse<UserSupplement[]>> => {
    const params = {
        userId,
    };

    return axios.get(`${API_URL}/api/GetUserSupplements`, {
        params,
    });
};

export const getUserBodyFat = (
    userId: string
): Promise<AxiosResponse<UserBodyFat[]>> => {
    const params = {
        userId,
    };

    return axios.get(`${API_URL}/api/GetUserBodyFat`, {
        params,
    });
};

export const getWorkout = (
    workoutId: number
): Promise<AxiosResponse<Workout>> => {
    const params = {
        workoutId,
    };
    return axios.get(`${API_URL}/api/GetWorkout`, {
        params,
    });
};

export const getWorkoutDetails = (
    workoutId: number
): Promise<AxiosResponse<WorkoutBlock[]>> => {
    const params = {
        workoutId,
    };
    return axios.get(`${API_URL}/api/GetWorkoutDetails`, {
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
    return axios.post(`${API_URL}/api/AddUserWorkoutCompleted`, body);
};

export const getUserNextWorkout = (
    userId: string
): Promise<AxiosResponse<UserNextWorkout>> => {
    const params = {
        userId,
    };

    return axios.get(`${API_URL}/api/GetNextWorkout`, {
        params,
    });
};

export const foodAutocomplete = (
    query: string
): Promise<AxiosResponse<string[]>> => {
    const params = {
        query,
    };
    return axios.get(`${API_URL}/api/AutocompleteFood`, {
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
    return axios.get(`${API_URL}/api/ParseFood`, {
        params,
    });
};

export const getFoodDetails = (
    foodId: string
): Promise<AxiosResponse<EdamamFoodDetails>> => {
    const params = {
        foodId,
    };
    return axios.get(`${API_URL}/api/GetFoodDetails`, {
        params,
    });
};

export const getUserFoods = (
    userId: string
): Promise<AxiosResponse<UserFoodGridItem[]>> => {
    const params = {
        userId,
    };
    return axios.get(`${API_URL}/api/GetUserFoodsForGrid`, {
        params,
    });
};

export const getMacros = (userId: string): Promise<AxiosResponse<Macros[]>> => {
    const params = {
        userId,
    };

    return axios.get(`${API_URL}/api/GetMacros`, {
        params,
    });
};

export const getCurrentUserMacros = (
    userId: string
): Promise<AxiosResponse<Macros>> => {
    const params = {
        userId,
    };
    return axios.get(`${API_URL}/api/GetCurrentUserMacros`, {
        params,
    });
};

export const addUserFood = (userFood: UserFood): Promise<AxiosResponse> => {
    return axios.post(`${API_URL}/api/AddUserFood`, userFood);
};

export const getUserDashboard = (
    userId: string,
    date: string
): Promise<AxiosResponse<Dashboard>> => {
    const params = {
        userId,
        date,
    };
    return axios.get(`${API_URL}/api/GetUserDashboard`, {
        params,
    });
};

export const restartWorkout = (params: {
    userId: string;
    workoutId: number;
}) => {
    return axios.get(`${API_URL}/api/RestartWorkout`, { params });
};
