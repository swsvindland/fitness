import { type FC } from 'react';
import { Gear } from '../Icons/Gear';
import { LinkButton } from '../Buttons/LinkButton';

interface IProps {
    name: string;
    amount: number;
    amountHigh?: number;
    currentAmount?: number;
    unit: string;
    customMacros?: boolean;
}

export const MacroGridUnit: FC<IProps> = ({
    name,
    amount,
    amountHigh,
    currentAmount,
    unit,
    customMacros,
}) => {
    const percentage = ((currentAmount ?? 0) / amount) * 100;
    const percentageHigh =
        ((currentAmount ?? 0) / (amountHigh ? amountHigh : amount)) * 100;

    return (
        <div className="card px-4 py-5 sm:p-6">
            <dt className="text-secondary flex justify-between text-base font-normal">
                <span>{name}</span>
                {customMacros && (
                    <LinkButton
                        to="/eat/custom-macros"
                        className="bg-transparent"
                    >
                        <Gear className="fill-secondary h-6 w-6" />
                    </LinkButton>
                )}
            </dt>
            <dd className="mt-1 flex items-baseline">
                {currentAmount !== undefined ? (
                    <>
                        <span className="text-ternary flex items-baseline text-lg font-semibold sm:text-2xl">
                            {currentAmount?.toFixed(0) ?? 0}
                        </span>
                        <span className="text-ternary text-xs sm:text-lg">
                            {unit}
                        </span>
                        <span className="text-ternary flex items-baseline text-lg font-semibold sm:text-2xl">
                            /
                        </span>
                    </>
                ) : null}
                <span className="text-ternary flex items-baseline text-lg font-semibold sm:text-2xl">
                    {amount?.toFixed(0)}
                </span>
                <span className="text-ternary flex items-baseline text-lg font-semibold sm:text-2xl">
                    {amountHigh ? `-${amountHigh.toFixed(0)}` : null}
                </span>
                <span className="text-ternary text-xs sm:text-lg">{unit}</span>
            </dd>
            {currentAmount !== undefined ? (
                <div className="relative mt-4">
                    <div className="bg-secondary-light mb-4 flex h-2 overflow-hidden rounded text-xs shadow-inner">
                        <div
                            style={{
                                width: `${
                                    ((currentAmount ?? 0) /
                                        (amountHigh ? amountHigh : amount)) *
                                    100
                                }%`,
                            }}
                            className={`flex flex-col justify-center whitespace-nowrap text-center text-white shadow-inner ${
                                percentage < 98
                                    ? 'bg-amber-500'
                                    : percentageHigh > 100
                                    ? 'bg-rose-500'
                                    : 'bg-teal-500'
                            }`}
                        ></div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
