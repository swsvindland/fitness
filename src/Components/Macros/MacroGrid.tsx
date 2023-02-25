import { FC, useContext } from 'react';
import { MacroGridUnit } from './MacroGridUnit';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { getCurrentUserMacros, getMacros } from '../../api';
import { Units } from '../../types/User';
import { AuthContext } from '../Auth/Auth';
import { classNames } from '../../utils/classNames';

interface IProps {
    home?: boolean;
}

export const MacroGrid: FC<IProps> = ({ home }) => {
    const { user } = useContext(AuthContext);
    const macrosQuery = useQuery(['Macros'], () => {
        return getMacros();
    });

    const currentMacrosQuery = useQuery(['CurrentMacros'], () => {
        return getCurrentUserMacros();
    });

    if (macrosQuery.isLoading || currentMacrosQuery.isLoading) {
        return (
            <div role="status" className="w-full animate-pulse">
                <div className="my-2 h-32 rounded bg-card dark:bg-primary-dark"></div>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                    <div className="my-2 h-32 rounded bg-card dark:bg-primary-dark"></div>
                    <div className="my-2 h-32 rounded bg-card dark:bg-primary-dark"></div>
                    <div className="my-2 h-32 rounded bg-card dark:bg-primary-dark"></div>
                    <div className="my-2 h-32 rounded bg-card dark:bg-primary-dark"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <div className="w-full">
            <>
                {currentMacrosQuery.isFetching ? (
                    <div className="card my-2 flex items-center justify-start p-2">
                        <Loading />{' '}
                        <span className="text-ternary">
                            Fetching current macros...
                        </span>
                    </div>
                ) : null}
            </>
            <div className="w-full">
                <MacroGridUnit
                    name="Calories"
                    amount={macrosQuery.data?.data?.calories ?? 0}
                    amountHigh={macrosQuery.data?.data.caloriesHigh}
                    currentAmount={currentMacrosQuery.data?.data.calories}
                    unit={user?.unit === Units.Imperial ? 'Cal' : 'kcal'}
                    customMacros={!home}
                />
                <dl
                    className={classNames(
                        home ? 'hidden md:grid' : '',
                        'mt-2 grid grid-cols-2 gap-2 overflow-hidden sm:grid-cols-4'
                    )}
                >
                    <MacroGridUnit
                        name="Protein"
                        amount={macrosQuery.data?.data?.protein ?? 0}
                        amountHigh={macrosQuery.data?.data.proteinHigh}
                        currentAmount={
                            currentMacrosQuery.data?.data?.protein ?? 0
                        }
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Fat"
                        amount={macrosQuery.data?.data?.fat ?? 0}
                        amountHigh={macrosQuery.data?.data.fatHigh}
                        currentAmount={currentMacrosQuery.data?.data?.fat ?? 0}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Carbs"
                        amount={macrosQuery.data?.data?.carbs ?? 0}
                        amountHigh={macrosQuery.data?.data.carbsHigh}
                        currentAmount={
                            currentMacrosQuery.data?.data?.carbs ?? 0
                        }
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Fiber"
                        amount={macrosQuery.data?.data?.fiber ?? 0}
                        amountHigh={macrosQuery.data?.data.fiberHigh}
                        currentAmount={
                            currentMacrosQuery.data?.data?.fiber ?? 0
                        }
                        unit="g"
                    />
                </dl>
            </div>
        </div>
    );
};
