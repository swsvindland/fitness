import axios, { AxiosResponse } from 'axios';
import { Supplement } from './types/supplement';
import { UserSupplement } from './types/userSupplement';
import { UserBodyFat } from './types/UserBodyFat';

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
