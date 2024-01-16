'use client';

import { FC, useState } from 'react';
import { MacroGridUnit } from './MacroGridUnit';
import { api } from '~/trpc/react';
import { LoadingMacroGrid, LoadingSpinner } from '@fitness/ui';
import { Scanner } from '~/app/_components/Scanner/Scanner';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

export const MacroGrid: FC = () => {
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
            <div className="mt-3 grid grid-cols-2 gap-2">
                <Scanner />
                <Button
                    color="primary"
                    className="flex w-full justify-center"
                    href="/add-food"
                    as={Link}
                >
                    Add Food
                </Button>
            </div>
        </div>
    );
};
