import axios, { AxiosResponse } from 'axios';
import { Supplement } from './types/supplement';
import { UserSupplement } from './types/userSupplement';
import { UserBodyFat } from './types/UserBodyFat';
import { Workout } from './types/Workout';
import { WorkoutBlock } from './types/WorkoutBlock';
import { EdamamFood } from './types/EdamamFood';
import { EdamamFoodDetails } from './types/EdamamFoodDetails';
import { Macros } from './types/Macros';
import { UserFood } from './types/UserFood';
import { UserFoodGridItem } from './types/UserFoodGridItem';
import { Dashboard } from './types/Dashboard';
import { UserNextWorkout } from './types/UserNextWorkout';
import { Auth } from './types/Auth';
import { UserWorkoutActivity } from './types/UserWorkoutActivity';
import { UserWorkout } from './types/UserWorkout';
import { UserBloodPressure } from './types/userBloodPressure';
import { UserBody } from './types/userBody';
import { UserWeight } from './types/userWeight';
import { User } from './types/user';

export const API_URL = 'http://localhost:7071';
// export const API_URL = 'https://fitness-dev.azurewebsites.net';

const getParams = (params?: object) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    return {
        userId,
        token: token,
        date: new Date().toISOString(),
        version: '1.0.0',
        ...params,
    };
};

export const auth = (body: {
    email: string;
    password: string;
}): Promise<AxiosResponse<Auth>> => {
    return axios.post(`${API_URL}/api/Auth`, body);
};

export const getUser = (): Promise<AxiosResponse<User>> => {
    const params = getParams();
    return axios.get(`${API_URL}/api/GetUser`, {
        params,
    });
};

export const createUser = (body: { email: string; password: string }) => {
    const params = getParams();

    return axios.post(`${API_URL}/api/CreateUser`, body, { params });
};

export const deleteUser = () => {
    const params = getParams();

    return axios.delete(`${API_URL}/api/DeleteUser`, { params });
};

export const getAllSupplements = (): Promise<AxiosResponse<Supplement[]>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetAllSupplements`, { params });
};

export const getUserSupplements = (): Promise<
    AxiosResponse<UserSupplement[]>
> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetUserSupplements`, {
        params,
    });
};

export const getUserBodyFat = (): Promise<AxiosResponse<UserBodyFat[]>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetUserBodyFat`, {
        params,
    });
};

export const getWorkout = (
    workoutId: number
): Promise<AxiosResponse<Workout>> => {
    const params = getParams({ workoutId });

    return axios.get(`${API_URL}/api/GetWorkout`, {
        params,
    });
};

export const getWorkoutDetails = (
    workoutId: number
): Promise<AxiosResponse<WorkoutBlock[]>> => {
    const params = getParams({ workoutId });

    return axios.get(`${API_URL}/api/GetWorkoutDetails`, {
        params,
    });
};

export const buyWorkout = (workoutId: number) => {
    const params = getParams({ workoutId });

    return axios.post(
        `${API_URL}/api/BuyWorkout`,
        {},
        {
            params,
        }
    );
};

export const getWorkoutActivity = (
    workoutBlockExerciseId: number,
    set: number,
    week: number,
    day: number
): Promise<AxiosResponse<UserWorkoutActivity>> => {
    const params = getParams({ workoutBlockExerciseId, set, week, day });

    return axios.get(`${API_URL}/api/GetUserWorkoutActivity`, {
        params,
    });
};

export const addWorkoutActivity = (body: {
    id?: number;
    userId: string;
    workoutBlockExerciseId: number;
    set: number;
    reps: number;
    weight: number;
    week: number;
    day: number;
}) => {
    const params = getParams();

    return axios.post(`${API_URL}/api/AddUserWorkoutActivity`, body, {
        params,
    });
};

export const getWorkouts = (): Promise<AxiosResponse<Workout[]>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetWorkouts`, { params });
};

export const getUserWorkouts = (): Promise<AxiosResponse<UserWorkout[]>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetUserWorkouts`, {
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
    const params = getParams();

    return axios.post(`${API_URL}/api/AddUserWorkoutCompleted`, body, {
        params,
    });
};

export const getUserNextWorkout = (): Promise<
    AxiosResponse<UserNextWorkout>
> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetNextWorkout`, {
        params,
    });
};

export const foodAutocomplete = (
    query: string
): Promise<AxiosResponse<string[]>> => {
    const params = getParams({ query });

    return axios.get(`${API_URL}/api/AutocompleteFood`, {
        params,
    });
};

export const searchFood = (
    query: string,
    barcode?: string
): Promise<AxiosResponse<EdamamFood[]>> => {
    const params = getParams({ query, barcode });

    return axios.get(`${API_URL}/api/ParseFood`, {
        params,
    });
};

export const getFoodDetails = (
    foodId: string
): Promise<AxiosResponse<EdamamFoodDetails>> => {
    const params = getParams({ foodId });

    return axios.get(`${API_URL}/api/GetFoodDetails`, {
        params,
    });
};

export const getUserFoods = (): Promise<AxiosResponse<UserFoodGridItem[]>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetUserFoodsForGrid`, {
        params,
    });
};

export const getMacros = (): Promise<AxiosResponse<Macros[]>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetMacros`, {
        params,
    });
};

export const getCurrentUserMacros = (): Promise<AxiosResponse<Macros>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetCurrentUserMacros`, {
        params,
    });
};

export const addUserFood = (userFood: UserFood): Promise<AxiosResponse> => {
    const params = getParams();

    return axios.post(`${API_URL}/api/AddUserFood`, userFood, { params });
};

export const getUserDashboard = (): Promise<AxiosResponse<Dashboard>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetUserDashboard`, {
        params,
    });
};

export const restartWorkout = (workoutId: number) => {
    const params = getParams({ workoutId });

    return axios.get(`${API_URL}/api/RestartWorkout`, { params });
};

export const updateUserSupplement = (userSupplement: UserSupplement) => {
    const params = getParams();

    return axios.post(`${API_URL}/api/UpdateUserSupplements`, userSupplement, {
        params,
    });
};

export const getUserSupplementActivity = (
    userSupplementId: number,
    time: string
): Promise<AxiosResponse<any>> | undefined => {
    const params = getParams({ userSupplementId, time });

    return axios.get(`${API_URL}/api/GetUserSupplementActivity`, {
        params,
    });
};

export const toggleUserSupplementActivity = (body: {
    date: string;
    userId: string;
    userSupplementId: number;
    time: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getParams();

    return axios.post(`${API_URL}/api/ToggleUserSupplementActivity`, body, {
        params,
    });
};

export const addBloodPressure = (body: {
    systolic: number;
    diastolic: number;
    userId: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getParams();

    return axios.post(`${API_URL}/api/AddUserBloodPressure`, body, { params });
};

export const getAllUserBloodPressure = (): Promise<
    AxiosResponse<UserBloodPressure[]>
> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetUserBloodPressures`, { params });
};

export const addBody = (body: {
    neck: number;
    shoulders: number;
    chest: number;
    leftBicep: number;
    rightBicep: number;
    navel: number;
    waist: number;
    hip: number;
    leftThigh: number;
    rightThigh: number;
    leftCalf: number;
    rightCalf: number;
    userId: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getParams();

    return axios.post(`${API_URL}/api/AddUserBody`, body, { params });
};

export const getAllUserBodies = (): Promise<AxiosResponse<UserBody[]>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetUserBodies`, {
        params,
    });
};

export const addHeight = (body: {
    height: number;
    userId: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getParams();

    return axios.post(`${API_URL}/api/AddUserHeight`, body, { params });
};

export const addWeight = (body: {
    weight: number;
    userId: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getParams();

    return axios.post(`${API_URL}/api/AddUserWeight`, body, { params });
};

export const getAllUserWeights = (): Promise<AxiosResponse<UserWeight[]>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetUserWeights`, {
        params,
    });
};

export const getMinVersion = (): Promise<AxiosResponse<number>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/MinVersion`, {
        params,
    });
};
