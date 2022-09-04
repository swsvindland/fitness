import { FC } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

interface IProps {
    name: string;
    amount: number;
    change: number;
    unit: string;
}

export const MacroGridUnit: FC<IProps> = ({ name, amount, change, unit }) => {
    return (
        <div className="m-1 rounded shadow bg-card px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-secondary">{name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-ternary">
                    {amount}
                    {unit}
                </div>

                <div className="mx-2 md:mt-2 lg:mt-0">
                    {change < 0 ? (
                        <div className="rounded-full text-sm font-medium bg-green-100 text-green-800 flex flex-row px-2 py-1">
                            <ArrowUpIcon
                                className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                                aria-hidden="true"
                            />
                            <span className="sr-only"> Increased by </span>
                            {change}
                            {unit}
                        </div>
                    ) : change > 0 ? (
                        <div className="rounded-full text-sm font-medium bg-red-100 text-red-900 flex flex-row px-2 py-1">
                            <ArrowDownIcon
                                className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                                aria-hidden="true"
                            />
                            <span className="sr-only"> Decrease by </span>
                            {Math.abs(change)}
                            {unit}
                        </div>
                    ) : undefined}
                </div>
            </dd>
        </div>
    );
};
