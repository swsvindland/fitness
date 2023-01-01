import { FC } from 'react';
import { Gear } from '../Icons/Gear';
import { LinkButton } from '../Buttons/LinkButton';

interface IProps {
    name: string;
    amount: number;
    currentAmount?: number;
    unit: string;
    customMacros?: boolean;
}

export const MacroGridUnit: FC<IProps> = ({
    name,
    amount,
    currentAmount,
    unit,
    customMacros,
}) => {
    return (
        <div className="card px-4 py-5 sm:p-6 mb-2">
            <dt className="text-base font-normal text-secondary flex justify-between">
                <span>{name}</span>
                {customMacros && (
                    <LinkButton
                        to="/eat/custom-macros"
                        className="bg-transparent"
                    >
                        <Gear className="w-6 h-6 fill-secondary" />
                    </LinkButton>
                )}
            </dt>
            <dd className="mt-1 flex items-baseline">
                {currentAmount !== undefined ? (
                    <>
                        <span className="flex items-baseline sm:text-2xl text-lg font-semibold text-ternary">
                            {currentAmount?.toFixed(0) ?? 0}
                        </span>
                        <span className="text-ternary sm:text-lg text-xs">
                            {unit}
                        </span>
                        <span className="flex items-baseline sm:text-2xl text-lg font-semibold text-ternary">
                            /
                        </span>
                    </>
                ) : null}
                <span className="flex items-baseline sm:text-2xl text-lg font-semibold text-ternary">
                    {amount?.toFixed(0)}
                </span>
                <span className="text-ternary sm:text-lg text-xs">{unit}</span>
            </dd>
            {currentAmount !== undefined ? (
                <div className="relative mt-4">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-secondary-light shadow-inner">
                        <div
                            style={{
                                width: `${
                                    ((currentAmount ?? 0) / amount) * 100
                                }%`,
                            }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-secondary"
                        ></div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
