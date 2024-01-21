import { MacroGridUnit } from './MacroGridUnit';
import { api } from '~/trpc/server';
import { FC } from 'react';

export const MacroGrid: FC = async () => {
    const macrosQuery = await api.macros.getMacros.query();
    const currentMacrosQuery = await api.macros.getCurrentMacros.query({
        date: new Date().toDateString(),
    });

    return (
        <div className="w-full">
            <div className="w-full">
                <MacroGridUnit
                    name="Calories"
                    amount={macrosQuery?.Calories ?? 0}
                    currentAmount={currentMacrosQuery?.Calories}
                    unit="kcal"
                />
                <dl className="mt-2 grid grid-cols-2 gap-2 overflow-hidden sm:grid-cols-4">
                    <MacroGridUnit
                        name="Protein"
                        amount={macrosQuery?.Protein ?? 0}
                        currentAmount={currentMacrosQuery?.Protein ?? 0}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Fat"
                        amount={macrosQuery?.Fat ?? 0}
                        currentAmount={currentMacrosQuery?.Fat ?? 0}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Carbs"
                        amount={macrosQuery?.Carbs ?? 0}
                        currentAmount={currentMacrosQuery?.Carbs ?? 0}
                        unit="g"
                    />
                    <MacroGridUnit
                        name="Fiber"
                        amount={macrosQuery?.Fiber ?? 0}
                        currentAmount={currentMacrosQuery?.Fiber ?? 0}
                        unit="g"
                    />
                </dl>
            </div>
        </div>
    );
};
