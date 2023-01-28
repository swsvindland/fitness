import { FC, useContext } from 'react';
import { MacroGridUnit } from './MacroGridUnit';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { getCurrentUserMacros, getMacros } from '../../api';
import { Units } from '../../types/user';
import { AuthContext } from '../Auth/Auth';

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
        return <Loading />;
    }

    return (
        <div className="w-full">
            <div className="w-full">
                <MacroGridUnit
                    name="Calories"
                    amount={macrosQuery.data?.data?.calories ?? 0}
                    amountHigh={macrosQuery.data?.data.caloriesHigh}
                    currentAmount={currentMacrosQuery.data?.data.calories}
                    unit={user?.unit === Units.Imperial ? 'Cal' : 'kcal'}
                    customMacros={!home}
                />
                {!home ? (
                    <dl className="mt-2 grid grid-cols-2 gap-2 overflow-hidden sm:grid-cols-4">
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
                            currentAmount={
                                currentMacrosQuery.data?.data?.fat ?? 0
                            }
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
                ) : null}
            </div>
        </div>
    );
};
