'use client';

import { MacroGridUnit } from './MacroGridUnit';
import { api } from '~/trpc/react';
import { FC } from 'react';

export const MacroGrid: FC = () => {
    const macrosQuery = api.macros.getMacros.useQuery();
    const currentMacrosQuery = api.macros.getCurrentMacros.useQuery({
        date: new Date().toDateString(),
    });

    return (
        <div className="w-full">
            <div className="w-full">
                <MacroGridUnit
                    name="Calories"
                    amount={macrosQuery.data?.Calories ?? 0}
                    currentAmount={currentMacrosQuery.data?.Calories}
                    unit="kcal"
                />
                <dl className="mt-2 grid grid-cols-2 gap-2 overflow-hidden sm:grid-cols-4">
                    <MacroGridUnit
                        name="Protein"
                        amount={macrosQuery.data?.Protein ?? 0}
                        currentAmount={currentMacrosQuery.data?.Protein ?? 0}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Fat"
                        amount={macrosQuery.data?.Fat ?? 0}
                        currentAmount={currentMacrosQuery.data?.Fat ?? 0}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Carbs"
                        amount={macrosQuery.data?.Carbs ?? 0}
                        currentAmount={currentMacrosQuery.data?.Carbs ?? 0}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Fiber"
                        amount={macrosQuery.data?.Fiber ?? 0}
                        currentAmount={currentMacrosQuery.data?.Fiber ?? 0}
                        unit="g"
                    />
                </dl>
            </div>
        </div>
    );
};
