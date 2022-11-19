import { FC, useContext } from 'react';
import { MacroGridUnit } from './MacroGridUnit';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { getCurrentUserMacros, getMacros } from '../../api';
import { Units } from '../../types/user';
import { AuthContext } from '../Auth/Auth';

export const MacroGrid: FC = () => {
    const { user } = useContext(AuthContext);
    const macrosQuery = useQuery(['Macros'], () => {
        return getMacros();
    });

    const currentMacrosQuery = useQuery(['CurrentMacros'], () => {
        return getCurrentUserMacros();
    });

    if (macrosQuery.isLoading || currentMacrosQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <MacroGridUnit
                    name="Calories"
                    amount={macrosQuery.data?.data?.calories ?? 0}
                    currentAmount={currentMacrosQuery.data?.data.calories}
                    unit={user?.unit === Units.Imperial ? 'Cal' : 'kcal'}
                    customMacros={true}
                />
                <dl className="grid overflow-hidden grid-cols-3">
                    <MacroGridUnit
                        name="Protein"
                        amount={macrosQuery.data?.data?.protein ?? 0}
                        currentAmount={currentMacrosQuery.data?.data?.protein}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Fat"
                        amount={macrosQuery.data?.data?.fat ?? 0}
                        currentAmount={currentMacrosQuery.data?.data?.fat}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Carbs"
                        amount={macrosQuery.data?.data?.carbs ?? 0}
                        currentAmount={currentMacrosQuery.data?.data?.carbs}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Fiber"
                        amount={macrosQuery.data?.data?.fiber ?? 0}
                        currentAmount={currentMacrosQuery.data?.data?.fiber}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Alcohol"
                        amount={macrosQuery.data?.data?.alcohol ?? 0}
                        currentAmount={currentMacrosQuery.data?.data?.alcohol}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Water"
                        amount={macrosQuery.data?.data?.water ?? 0}
                        currentAmount={currentMacrosQuery.data?.data?.water}
                        unit={user?.unit === Units.Imperial ? 'floz' : 'ml'}
                    />
                </dl>
            </div>
        </div>
    );
};
