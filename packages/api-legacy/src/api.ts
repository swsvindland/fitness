import axios, { AxiosResponse } from 'axios';
import {
    Auth,
    Dashboard,
    Exercise,
    FatSecretAuth,
    Food,
    Macros,
    ProgressPhoto,
    SearchFood,
    Supplement,
    User,
    UserBloodPressure,
    UserBodyFat,
    UserFoodV2,
    UserNextWorkout,
    UserSupplement,
    UserWeight,
    UserWorkoutExercise,
    UserWorkout,
    UserWorkoutSubstitution,
    Workout,
    WorkoutExercise,
    WorkoutType,
    UserBody,
    Sex,
    Units,
} from '@fitness/types';

// export const API_URL = 'http://localhost:7071';
// export const API_URL = 'http://10.0.2.2:7071';
// export const API_URL = 'http://192.168.1.6:7071';
// export const API_URL = 'https://fitness-dev.azurewebsites.net';
export const API_URL = 'https://fitness-prod.azurewebsites.net';
//
// export const CDN_URL =
//     'https://fitnessdev.blob.core.windows.net/progress-photos/';
export const CDN_URL =
    'https://fitnessprod.blob.core.windows.net/progress-photos/';

const getHeaders = (params?: object, headers?: object) => {
    const userId = localStorage.getItem('userId');
    const clerkToken = localStorage.getItem('clerk-db-jwt');

    return {
        headers: {
            Authorization: 'Bearer ' + clerkToken,
            ...headers,
        },
        params: {
            userId,
            date: new Date().toDateString(),
            ...params,
        },
    };
};

export const authV2 = (body: {
    email: string;
    password: string;
}): Promise<AxiosResponse<Auth>> => {
    return axios.post(`${API_URL}/api/AuthV2`, body);
};

export const ssoAuthV2 = (body: {
    email: string;
    token: string;
}): Promise<AxiosResponse<Auth>> => {
    return axios.post(`${API_URL}/api/SSOAuthV2`, body);
};

export const getUser = (): Promise<AxiosResponse<User>> => {
    const params = getHeaders();
    return axios.get(`${API_URL}/api/GetUser`, params);
};

export const createUser = (body: { email: string; password: string }) => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/CreateUser`, body, params);
};

export const forgotPassword = (email: string) => {
    const params = { email };
    return axios.get(`${API_URL}/api/ForgotPassword`, { params });
};

export const deleteUser = () => {
    const params = getHeaders();

    return axios.delete(`${API_URL}/api/DeleteUser`, params);
};

export const getAllSupplements = (): Promise<AxiosResponse<Supplement[]>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetAllSupplements`, params);
};

export const getUserSupplements = (): Promise<
    AxiosResponse<UserSupplement[]>
> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetUserSupplements`, params);
};

export const getUserBodyFat = (): Promise<AxiosResponse<UserBodyFat[]>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetUserBodyFat`, params);
};

export const getWorkout = (
    workoutId: number
): Promise<AxiosResponse<Workout>> => {
    const params = getHeaders({ workoutId });

    return axios.get(`${API_URL}/api/GetWorkout`, params);
};

export const getWorkoutExercises = (
    workoutId: number,
    day: number
): Promise<AxiosResponse<WorkoutExercise[]>> => {
    const params = getHeaders({ workoutId, day });

    return axios.get(`${API_URL}/api/GetWorkoutExercises`, params);
};

export const buyWorkout = (workoutId: number) => {
    const params = getHeaders({
        workoutId,
    });

    return axios.post(`${API_URL}/api/BuyWorkout`, {}, params);
};

export const getUserWorkoutExercise = (
    workoutExerciseId: number,
    week: number,
    day: number
): Promise<AxiosResponse<UserWorkoutExercise>> => {
    const params = getHeaders({ workoutExerciseId, week, day });

    return axios.get(`${API_URL}/api/GetUserWorkoutExercise`, params);
};

export const addWorkoutActivity = (body: {
    id?: number;
    userId: string;
    workoutExerciseId: number;
    set: number;
    reps: number;
    weight?: number;
    time?: number;
    week: number;
    day: number;
}) => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/AddUserWorkoutActivity`, body, params);
};

export const getWorkouts = (): Promise<AxiosResponse<Workout[]>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetWorkouts`, params);
};

export const getUserWorkouts = (): Promise<AxiosResponse<UserWorkout[]>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetUserWorkouts`, params);
};

export const completeWorkout = (body: {
    userId: string;
    workoutId?: number;
    userCustomWorkoutId?: number;
    week: number;
    day: number;
}): Promise<AxiosResponse> => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/AddUserWorkoutCompleted`, body, params);
};

export const getUserNextWorkout = (): Promise<
    AxiosResponse<UserNextWorkout>
> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetNextWorkout`, params);
};

export const foodAutocomplete = (
    query: string
): Promise<AxiosResponse<string[]>> => {
    const params = getHeaders({ query });

    return axios.get(`${API_URL}/api/AutocompleteFood`, params);
};

export const searchFood = (
    query: string,
    page: number
): Promise<AxiosResponse<SearchFood[]>> => {
    const params = getHeaders({ query, page });

    return axios.get(`${API_URL}/api/SearchFood`, params);
};

export const searchFoodByBarcode = (
    barcode: string
): Promise<AxiosResponse<Food>> => {
    const params = getHeaders({ barcode });

    return axios.get(`${API_URL}/api/SearchFoodByBarcode`, params);
};

export const getFoodDetails = (
    foodId: number
): Promise<AxiosResponse<Food>> => {
    const params = getHeaders({ foodId });

    return axios.get(`${API_URL}/api/GetFoodV2`, params);
};

export const addUserFood = (body: UserFoodV2) => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/AddUserFoodV2`, body, params);
};

export const getUserFood = (
    userFoodId: number
): Promise<AxiosResponse<UserFoodV2>> => {
    const params = getHeaders({ userFoodId });

    return axios.get(`${API_URL}/api/GetUserFoodV2`, params);
};

export const getUserFoods = (): Promise<AxiosResponse<UserFoodV2[]>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetAllUserFoodV2`, params);
};

export const getRecentUserFoods = (): Promise<AxiosResponse<UserFoodV2[]>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetRecentUserFoods`, params);
};

export const getMacros = (): Promise<AxiosResponse<Macros>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetMacros`, params);
};

export const addCustomMacros = (
    body: Macros
): Promise<AxiosResponse<boolean>> => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/AddCustomMacros`, body, params);
};

export const getCurrentUserMacros = (): Promise<AxiosResponse<Macros>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetCurrentUserMacrosV2`, params);
};

export const updateUserFood = (
    userFood: UserFoodV2
): Promise<AxiosResponse> => {
    const params = getHeaders();

    return axios.put(`${API_URL}/api/UpdateUserFoodV2`, userFood, params);
};

export const deleteUserFood = (userFoodId: number): Promise<AxiosResponse> => {
    const params = getHeaders({ userFoodId });

    return axios.delete(`${API_URL}/api/DeleteUserFoodV2`, params);
};

export const getUserDashboard = (): Promise<AxiosResponse<Dashboard>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetUserDashboard`, params);
};

export const restartWorkout = (workoutId: number) => {
    const params = getHeaders({ workoutId });

    return axios.get(`${API_URL}/api/RestartWorkout`, params);
};

export const updateUserSupplement = (userSupplement: UserSupplement) => {
    const params = getHeaders();

    return axios.post(
        `${API_URL}/api/UpdateUserSupplements`,
        userSupplement,
        params
    );
};

export const getUserSupplementActivity = (
    userSupplementId: number,
    time: string
): Promise<AxiosResponse<any>> | undefined => {
    const params = getHeaders({ userSupplementId, time });

    return axios.get(`${API_URL}/api/GetUserSupplementActivity`, params);
};

export const toggleUserSupplementActivity = (body: {
    date: string;
    userId: string;
    userSupplementId: number;
    time: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getHeaders();

    return axios.post(
        `${API_URL}/api/ToggleUserSupplementActivity`,
        body,
        params
    );
};

export const addBloodPressure = (body: {
    systolic: number;
    diastolic: number;
    userId: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/AddUserBloodPressure`, body, params);
};

export const getAllUserBloodPressure = (): Promise<
    AxiosResponse<UserBloodPressure[]>
> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetUserBloodPressures`, params);
};

export const updateUserBloodPressure = (
    body: UserBloodPressure
): Promise<boolean> => {
    const params = getHeaders();

    return axios.put(`${API_URL}/api/UpdateUserBloodPressure`, body, params);
};

export const deleteUserBloodPressure = (id: number): Promise<boolean> => {
    const params = getHeaders({ id });

    return axios.delete(`${API_URL}/api/DeleteUserBloodPressure`, params);
};

export const addBody = (body: UserBody): Promise<AxiosResponse<boolean>> => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/AddUserBody`, body, params);
};

export const getAllUserBodies = (): Promise<AxiosResponse<UserBody[]>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetUserBodies`, params);
};

export const updateUserBody = (body: UserBody): Promise<boolean> => {
    const params = getHeaders();

    return axios.put(`${API_URL}/api/UpdateUserBody`, body, params);
};

export const deleteUserBody = (id: number): Promise<boolean> => {
    const params = getHeaders({ id });

    return axios.delete(`${API_URL}/api/DeleteUserBody`, params);
};

export const addHeight = (body: {
    height: number;
    userId: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/AddUserHeight`, body, params);
};

export const addWeight = (body: {
    weight: number;
    userId: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/AddUserWeight`, body, params);
};

export const getAllUserWeights = (): Promise<AxiosResponse<UserWeight[]>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetUserWeights`, params);
};

export const updateUserWeight = (body: UserWeight): Promise<boolean> => {
    const params = getHeaders();

    return axios.put(`${API_URL}/api/UpdateUserWeight`, body, params);
};

export const deleteUserWeight = (id: number): Promise<boolean> => {
    const params = getHeaders({ id });

    return axios.delete(`${API_URL}/api/DeleteUserWeight`, params);
};

export const getMinVersion = (): Promise<AxiosResponse<number>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/MinVersion`, params);
};

export const updateSex = (body: {
    sex: Sex;
}): Promise<AxiosResponse<boolean>> => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/UpdateUserSex`, body, params);
};

export const updatePaid = (body: {
    paid: boolean;
    paidUntil?: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getHeaders();

    return axios.put(`${API_URL}/api/UpdateUserPaid`, body, params);
};

export const changePassword = (body: {
    oldPassword: string;
    newPassword: string;
}): Promise<AxiosResponse<boolean>> => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/ChangePassword`, body, params);
};

export const updateUnits = (body: {
    unit: Units;
}): Promise<AxiosResponse<boolean>> => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/UpdateUserUnits`, body, params);
};

export const getWorkoutsByUserId = (): Promise<AxiosResponse<Workout[]>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetWorkoutsByUserId`, params);
};

export const addWorkout = (body: {
    userId: string;
    name: string;
    description: string;
    days: number;
    duration: number;
    type: WorkoutType;
}): Promise<AxiosResponse<number>> => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/AddWorkout`, body, params);
};

export const editWorkout = (body: {
    id: number;
    userId: string;
    name: string;
    description: string;
    days: number;
    duration: number;
    type: WorkoutType;
}): Promise<AxiosResponse<number>> => {
    const params = getHeaders();

    return axios.put(`${API_URL}/api/EditWorkout`, body, params);
};

export const deleteWorkout = (
    workoutId: number
): Promise<AxiosResponse<number>> => {
    const params = getHeaders({ workoutId });

    return axios.delete(`${API_URL}/api/DeleteWorkout`, params);
};

export const getExercises = (): Promise<AxiosResponse<Exercise[]>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetExercises`, params);
};

export const getAllWorkoutExercises = (
    workoutId: number
): Promise<AxiosResponse<WorkoutExercise[]>> => {
    const params = getHeaders({ workoutId });

    return axios.get(`${API_URL}/api/GetAllWorkoutExercises`, params);
};

export const upsertWorkoutExercises = (body: {
    id?: number;
    exerciseId: number;
    workoutId: number;
    day: number;
    sets: number;
    minReps?: number;
    maxReps?: number;
    time?: number;
    order: number;
    restTime?: number;
}): Promise<AxiosResponse<WorkoutExercise[]>> => {
    const params = getHeaders({ id: body.id });

    return axios.post(`${API_URL}/api/UpsertWorkoutExercises`, body, params);
};

export const quickAddFood = (
    foodId: number
): Promise<AxiosResponse<number>> => {
    const params = getHeaders({ foodId });

    return axios.get(`${API_URL}/api/QuickAddUserFoodV2`, params);
};

export const quickRemoveFood = (
    foodId: number
): Promise<AxiosResponse<number>> => {
    const params = getHeaders({ foodId });

    return axios.get(`${API_URL}/api/QuickRemoveUserFoodV2`, params);
};

export const getProgressPhotos = (): Promise<
    AxiosResponse<ProgressPhoto[]>
> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/GetProgressPhotos`, params);
};

export const addProgressPhoto = async (photos: Blob[]) => {
    const headers = { 'Content-Type': 'multipart/form-data' };
    const params = getHeaders({}, { ...headers });
    const fileNames: string[] = [];

    photos.map(async (photo) => {
        const bodyFormData = new FormData();
        bodyFormData.append('file', photo);

        const response = await axios.post(
            `${API_URL}/api/UploadProgressPhoto`,
            bodyFormData,
            params
        );

        fileNames.push(response.data);
    });

    return fileNames;
};

export const getUserWorkoutSubstitution = (
    workoutExerciseId: number
): Promise<AxiosResponse<UserWorkoutSubstitution>> => {
    const params = getHeaders({ workoutExerciseId });

    return axios.get(`${API_URL}/api/GetUserWorkoutSubstitution`, params);
};

export const addUserWorkoutSubstitution = (sub: UserWorkoutSubstitution) => {
    const params = getHeaders();

    return axios.post(`${API_URL}/api/AddUserWorkoutSubstitution`, sub, params);
};

export const updateUserWorkoutSubstitution = (sub: UserWorkoutSubstitution) => {
    const params = getHeaders();

    return axios.put(
        `${API_URL}/api/UpdateUserWorkoutSubstitution`,
        sub,
        params
    );
};

export const deleteUserWorkoutSubstitution = (id: number) => {
    const params = getHeaders({ id });

    return axios.delete(`${API_URL}/api/DeleteUserWorkoutSubstitution`, params);
};

export const foodApiAuth = (): Promise<AxiosResponse<FatSecretAuth>> => {
    const params = getHeaders();

    return axios.get(`${API_URL}/api/FoodApiAuth`, params);
};
