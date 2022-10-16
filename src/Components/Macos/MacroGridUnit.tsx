import { FC } from 'react';

interface IProps {
    name: string;
    amount: number;
    currentAmount?: number;
    unit: string;
}

export const MacroGridUnit: FC<IProps> = ({
    name,
    amount,
    currentAmount,
    unit,
}) => {
    return (
        <div className="m-1 rounded shadow bg-card px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-secondary">{name}</dt>
            <dd className="mt-1 flex items-baseline">
                <span className="flex items-baseline sm:text-2xl text-lg font-semibold text-ternary">
                    {currentAmount?.toFixed(2) ?? 0}
                </span>
                <span className="text-ternary sm:text-lg text-xs">{unit}</span>
                <span className="flex items-baseline sm:text-2xl text-lg font-semibold text-ternary">
                    /
                </span>
                <span className="flex items-baseline sm:text-2xl text-lg font-semibold text-ternary">
                    {amount.toFixed(2)}
                </span>
                <span className="text-ternary sm:text-lg text-xs">{unit}</span>
            </dd>
            <div className="relative mt-4">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-secondary-light shadow-inner">
                    <div
                        style={{
                            width: `${((currentAmount ?? 0) / amount) * 100}%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-secondary"
                    ></div>
                </div>
            </div>
        </div>
    );
};
