import { FC, useContext } from 'react';
import { MacroGridUnit } from './MacroGridUnit';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Auth/Auth';
import { Macros } from '../../types/Macros';
import { Loading } from '../Loading';

export const MacroGrid: FC = () => {
    const { user } = useContext(AuthContext);

    const getMacros = (): Promise<AxiosResponse<Macros[]>> => {
        const params = {
            userId: user?.id,
        };

        return axios.get(`${process.env.REACT_APP_API_URL}/api/GetMacros`, {
            params,
        });
    };

    const { data, isLoading } = useQuery(['Macros', user?.id], getMacros);

    if (isLoading) {
        return <Loading />;
    }

    const length = data?.data.length ?? 0;
    const last = length > 0 ? data?.data[length - 1] : undefined;
    const secondToLast = length > 1 ? data?.data[length - 2] : undefined;

    return (
        <div>
            <div>
                <dl className="mt-5 grid grid-cols-2 overflow-hidden md:grid-cols-3">
                    <MacroGridUnit
                        name="Protein"
                        amount={last?.protein ?? 0}
                        change={
                            (secondToLast?.protein ?? 0) - (last?.protein ?? 0)
                        }
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Fat"
                        amount={last?.fat ?? 0}
                        change={(secondToLast?.fat ?? 0) - (last?.fat ?? 0)}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Carbs"
                        amount={last?.carbs ?? 0}
                        change={(secondToLast?.carbs ?? 0) - (last?.carbs ?? 0)}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Fiber"
                        amount={last?.fiber ?? 0}
                        change={(secondToLast?.fiber ?? 0) - (last?.fiber ?? 0)}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Alcohol"
                        amount={last?.alcohol ?? 0}
                        change={
                            (secondToLast?.alcohol ?? 0) - (last?.alcohol ?? 0)
                        }
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Water"
                        amount={last?.water ?? 0}
                        change={(secondToLast?.water ?? 0) - (last?.water ?? 0)}
                        unit="fl oz"
                    />
                </dl>
            </div>
        </div>
    );
};
