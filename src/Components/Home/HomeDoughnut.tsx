import React, { type FC, useMemo, useState } from 'react';
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    type ChartData,
    ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface HomeDoughnutProps {
    defaultData: number[];
}

export const HomeDoughnut: FC<HomeDoughnutProps> = ({ defaultData }) => {
    const [data, setData] = useState<
        ChartData<'doughnut', (number | null)[]> | undefined
    >(undefined);

    useMemo(() => {
        setData({
            labels: ['Protein', 'Carbs', 'Fat', 'Fiber'],
            datasets: [
                {
                    data:
                        defaultData.length === 0
                            ? [0, 0, 0, 0, 1]
                            : defaultData,
                    borderColor: [
                        '#f59e0b',
                        '#84cc16',
                        '#10b981',
                        '#06b6d4',
                        '#64748b',
                    ],
                    backgroundColor: [
                        '#f59e0b',
                        '#84cc16',
                        '#10b981',
                        '#06b6d4',
                        '#64748b',
                    ],
                },
            ],
        });
    }, [defaultData]);

    if (!data) {
        return null;
    }

    return (
        <div className="flex h-64 w-full items-center justify-center">
            <Doughnut data={data} />
        </div>
    );
};
