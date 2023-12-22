'use client';

import { FC, useState } from 'react';
import { MacroGridUnit } from './MacroGridUnit';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { LoadingMacroGrid } from '../Loading/LoadingMacroGrid';
import { api } from '~/trpc/react';
import { LinkButton } from '~/app/_components/Buttons/LinkButton';
import { Scanner } from '~/app/_components/Scanner/Scanner';

export const MacroGrid: FC = () => {
    const [openScanner, setOpenScanner] = useState(false);

    const macrosQuery = api.macros.getMacros.useQuery();
    const currentMacrosQuery = api.macros.getCurrentMacros.useQuery({
        date: new Date().toDateString(),
    });

    if (macrosQuery.isLoading) {
        return <LoadingMacroGrid isLoading={true} />;
    }

    return (
        <div className="w-full">
            <>
                {currentMacrosQuery.isFetching ? (
                    <div className="card my-2 flex items-center justify-start p-2">
                        <LoadingSpinner />{' '}
                        <span className="text-ternary">
                            Fetching current macros...
                        </span>
                    </div>
                ) : null}
            </>
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
            <div className="flex w-full flex-row justify-between gap-2 pt-2">
                <Scanner
                    buttonClassName="flex w-full justify-center"
                    open={openScanner}
                    setOpen={setOpenScanner}
                />
                <LinkButton
                    className="flex w-full justify-center"
                    to={'/eat/add-food'}
                >
                    Add Food
                </LinkButton>
            </div>
        </div>
    );
};
