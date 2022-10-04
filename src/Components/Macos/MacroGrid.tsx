import { FC, useContext } from 'react';
import { MacroGridUnit } from './MacroGridUnit';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Auth/Auth';
import { Loading } from '../Loading';
import { getCurrentUserMacros, getMacros } from '../../api';

export const MacroGrid: FC = () => {
    const { user } = useContext(AuthContext);

    const macrosQuery = useQuery(['Macros', user?.id], () => {
        if (!user) return;
        return getMacros(user.id);
    });
    const currentMacrosQuery = useQuery(['CurrentMacros', user?.id], () => {
        if (!user) return;
        return getCurrentUserMacros(user.id);
    });

    if (macrosQuery.isLoading || currentMacrosQuery.isLoading) {
        return <Loading />;
    }

    const length = macrosQuery.data?.data.length ?? 0;
    const last = length > 0 ? macrosQuery.data?.data[length - 1] : undefined;

    return (
        <div className="w-full">
            <div className="w-full">
                <MacroGridUnit
                    name="Calories"
                    amount={last?.calories ?? 0}
                    currentAmount={currentMacrosQuery.data?.data.calories}
                    unit="kcal"
                />
                <dl className="grid overflow-hidden grid-cols-3">
                    <MacroGridUnit
                        name="Protein"
                        amount={last?.protein ?? 0}
                        currentAmount={currentMacrosQuery.data?.data.protein}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Fat"
                        amount={last?.fat ?? 0}
                        currentAmount={currentMacrosQuery.data?.data.fat}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Carbs"
                        amount={last?.carbs ?? 0}
                        currentAmount={currentMacrosQuery.data?.data.carbs}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Fiber"
                        amount={last?.fiber ?? 0}
                        currentAmount={currentMacrosQuery.data?.data.fiber}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Alcohol"
                        amount={last?.alcohol ?? 0}
                        currentAmount={currentMacrosQuery.data?.data.alcohol}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Water"
                        amount={last?.water ?? 0}
                        currentAmount={currentMacrosQuery.data?.data.water}
                        unit="floz"
                    />
                </dl>
            </div>
        </div>
    );
};
