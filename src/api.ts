import axios, { AxiosResponse } from 'axios';
import { Supplement } from './types/supplement';
import { UserSupplement } from './types/userSupplement';
import { UserBodyFat } from './types/UserBodyFat';
import { Workout } from './types/Workout';
import { Macros } from './types/Macros';
import { Dashboard } from './types/Dashboard';
import { UserNextWorkout } from './types/UserNextWorkout';
import { Auth } from './types/Auth';
import { UserWorkoutActivity } from './types/UserWorkoutActivity';
import { UserWorkout } from './types/UserWorkout';
import { UserBloodPressure } from './types/userBloodPressure';
import { UserBody } from './types/userBody';
import { UserWeight } from './types/userWeight';
import { Sex, Units, User } from './types/user';
import { Food } from './types/Food';
import { WorkoutExercise } from './types/WorkoutExercise';
import { Exercise } from './types/Exercise';
import { SearchFood } from './types/SearchFood';
import { UserFoodV2 } from './types/UserFoodV2';

export const API_URL = 'http://localhost:7071';
// export const API_URL = 'https://fitness-dev.azurewebsites.net';
// export const API_URL = 'https://fitness-prod.azurewebsites.net';

const getParams = (params?: object) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    return {
        userId,
        token: token,
        date: new Date().toDateString(),
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

export const forgotPassword = (email: string) => {
    const params = { email };
    return axios.get(`${API_URL}/api/ForgotPassword`, { params });
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

export const getWorkoutExercises = (
    workoutId: number,
    day: number
): Promise<AxiosResponse<WorkoutExercise[]>> => {
    const params = getParams({ workoutId, day });

    return axios.get(`${API_URL}/api/GetWorkoutExercises`, {
        params,
    });
};

export const buyWorkout = (workoutId: number) => {
    const params = getParams({
        workoutId,
    });

    return axios.post(
        `${API_URL}/api/BuyWorkout`,
        {},
        {
            params,
        }
    );
};

export const getWorkoutActivity = (
    workoutExerciseId: number,
    set: number,
    week: number,
    day: number
): Promise<AxiosResponse<UserWorkoutActivity>> => {
    const params = getParams({ workoutExerciseId, set, week, day });

    return axios.get(`${API_URL}/api/GetUserWorkoutActivity`, {
        params,
    });
};

export const addWorkoutActivity = (body: {
    id?: number;
    userId: string;
    workoutExerciseId: number;
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
    workoutId?: number;
    userCustomWorkoutId?: number;
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
    page: number
): Promise<AxiosResponse<SearchFood[]>> => {
    const params = getParams({ query, page });

    return axios.get(`${API_URL}/api/SearchFood`, {
        params,
    });
};

export const getFoodDetails = (
    foodId: number
): Promise<AxiosResponse<Food>> => {
    const params = getParams({ foodId });

    return axios.get(`${API_URL}/api/GetFoodV2`, {
        params,
    });
};

export const addUserFood = (body: UserFoodV2) => {
    const params = getParams();

    return axios.post(`${API_URL}/api/AddUserFoodV2`, body, {
        params,
    });
};

export const getUserFood = (
    userFoodId: number
): Promise<AxiosResponse<UserFoodV2>> => {
    const params = getParams({ userFoodId });

    return axios.get(`${API_URL}/api/GetUserFoodV2`, {
        params,
    });
};

export const getFood = (foodId: string): Promise<AxiosResponse<Food>> => {
    const params = getParams({ foodId });

    return axios.get(`${API_URL}/api/GetFood`, {
        params,
    });
};

export const getUserFoods = (): Promise<AxiosResponse<UserFoodV2[]>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetAllUserFoodV2`, {
        params,
    });
};

export const getMacros = (): Promise<AxiosResponse<Macros>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetMacros`, {
        params,
    });
};

export const addCustomMacros = (
    body: Macros
): Promise<AxiosResponse<boolean>> => {
    const params = getParams();

    return axios.post(`${API_URL}/api/AddCustomMacros`, body, {
        params,
    });
};

export const getCurrentUserMacros = (): Promise<AxiosResponse<Macros>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetCurrentUserMacrosV2`, {
        params,
    });
};

export const updateUserFood = (
    userFood: UserFoodV2
): Promise<AxiosResponse> => {
    const params = getParams();

    return axios.put(`${API_URL}/api/UpdateUserFoodV2`, userFood, { params });
};

export const deleteUserFood = (userFoodId: number): Promise<AxiosResponse> => {
    const params = getParams({ userFoodId });

    return axios.delete(`${API_URL}/api/DeleteUserFoodV2`, { params });
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

export const updateSex = (body: {
    sex: Sex;
}): Promise<AxiosResponse<boolean>> => {
    const params = getParams();

    return axios.post(`${API_URL}/api/UpdateUserSex`, body, { params });
};

export const updatePaid = (body: {
    paid: boolean;
    paidUntil?: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getParams();

    return axios.put(`${API_URL}/api/UpdateUserPaid`, body, { params });
};

export const changePassword = (body: {
    oldPassword: string;
    newPassword: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getParams();

    return axios.post(`${API_URL}/api/ChangePassword`, body, { params });
};

export const updateUnits = (body: {
    unit: Units;
}): Promise<AxiosResponse<boolean>> => {
    const params = getParams();

    return axios.post(`${API_URL}/api/UpdateUserUnits`, body, { params });
};

export const getWorkoutsByUserId = (): Promise<AxiosResponse<Workout[]>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetWorkoutsByUserId`, { params });
};

export const addWorkout = (body: {
    userId: string;
    name: string;
    description: string;
    days: number;
    duration: number;
}): Promise<AxiosResponse<number>> => {
    const params = getParams();

    return axios.post(`${API_URL}/api/AddWorkout`, body, { params });
};

export const editWorkout = (body: {
    id: number;
    userId: string;
    name: string;
    description: string;
    days: number;
    duration: number;
}): Promise<AxiosResponse<number>> => {
    const params = getParams();

    return axios.put(`${API_URL}/api/EditWorkout`, body, { params });
};

export const deleteWorkout = (
    workoutId: number
): Promise<AxiosResponse<number>> => {
    const params = getParams({ workoutId });

    return axios.delete(`${API_URL}/api/DeleteWorkout`, { params });
};

export const getExercises = (): Promise<AxiosResponse<Exercise[]>> => {
    const params = getParams();

    return axios.get(`${API_URL}/api/GetExercises`, { params });
};

export const getAllWorkoutExercises = (
    workoutId: number
): Promise<AxiosResponse<WorkoutExercise[]>> => {
    const params = getParams({ workoutId });

    return axios.get(`${API_URL}/api/GetAllWorkoutExercises`, {
        params,
    });
};

export const upsertWorkoutExercises = (body: {
    id?: number;
    exerciseId: number;
    workoutId: number;
    day: number;
    sets: number;
    minReps: number;
    maxReps: number;
    order: number;
}): Promise<AxiosResponse<WorkoutExercise[]>> => {
    const params = getParams({ id: body.id });

    return axios.post(`${API_URL}/api/UpsertWorkoutExercises`, body, {
        params,
    });
};
