import { type FC, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserMacros, getMacros } from '../../api';
import { LoadingCard } from '../Loading/LoadingCard';
import { HomeDoughnut } from './HomeDoughnut';

export const HomeMacros: FC = () => {
    const [doughnutData, setDoughnutData] = useState<number[]>([]);

    const macrosQuery = useQuery(['Macros'], () => {
        return getMacros();
    });

    const currentMacrosQuery = useQuery(['CurrentMacros'], () => {
        return getCurrentUserMacros();
    });

    useMemo(() => {
        const total =
            (currentMacrosQuery.data?.data.protein ?? 0) +
            (currentMacrosQuery.data?.data.fat ?? 0) +
            (currentMacrosQuery.data?.data.carbs ?? 0) +
            (currentMacrosQuery.data?.data.fiber ?? 0);

        const protein =
            (currentMacrosQuery.data?.data.protein ?? 0) / total || 0;
        const fat = (currentMacrosQuery.data?.data.fat ?? 0) / total || 0;
        const carbs = (currentMacrosQuery.data?.data.carbs ?? 0) / total || 0;
        const fiber = (currentMacrosQuery.data?.data.fiber ?? 0) / total || 0;
        const none = 1 - (protein + fat + carbs + fiber);

        setDoughnutData([protein, fat, carbs, fiber, none]);
    }, [
        currentMacrosQuery.data?.data.carbs,
        currentMacrosQuery.data?.data.fat,
        currentMacrosQuery.data?.data.fiber,
        currentMacrosQuery.data?.data.protein,
    ]);

    if (macrosQuery.isLoading || currentMacrosQuery.isLoading) {
        return <LoadingCard isLoading={true} />;
    }

    return (
        <div className="card grid grid-cols-2 p-4">
            <HomeDoughnut defaultData={doughnutData} />
            <div className="flex w-full items-center justify-center">
                <dl className="grid grid-cols-3">
                    <dt className="mr-2 font-bold">Calories</dt>
                    <dd>
                        {currentMacrosQuery.data?.data.calories?.toFixed(2)}
                    </dd>
                    <dd>{macrosQuery.data?.data.calories?.toFixed(2)}</dd>
                    <dt className="mr-2 font-bold">Protein</dt>
                    <dd>{currentMacrosQuery.data?.data.protein?.toFixed(2)}</dd>
                    <dd>{macrosQuery.data?.data.protein?.toFixed(2)}</dd>
                    <dt className="mr-2 font-bold">Fat</dt>
                    <dd>{currentMacrosQuery.data?.data.fat?.toFixed(2)}</dd>
                    <dd>{macrosQuery.data?.data.fat?.toFixed(2)}</dd>
                    <dt className="mr-2 font-bold">Carbs</dt>
                    <dd>{currentMacrosQuery.data?.data.carbs?.toFixed(2)}</dd>
                    <dd>{macrosQuery.data?.data.carbs?.toFixed(2)}</dd>
                    <dt className="mr-2 font-bold">Fiber</dt>
                    <dd>{currentMacrosQuery.data?.data.fiber?.toFixed(2)}</dd>
                    <dd>{macrosQuery.data?.data.fiber?.toFixed(2)}</dd>
                </dl>
            </div>
        </div>
    );
};
