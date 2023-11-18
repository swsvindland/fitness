import { FC } from "react";

interface IProps {
  name: string;
  amount: number;
  amountHigh?: number;
  currentAmount?: number;
  unit: string;
}

export const MacroGridUnit: FC<IProps> = ({
  name,
  amount,
  amountHigh,
  currentAmount,
  unit,
}) => {
  const percentage = ((currentAmount ?? 0) / amount) * 100;
  const percentageHigh =
    ((currentAmount ?? 0) / (amountHigh ? amountHigh : amount)) * 100;

  return (
    <div className="card px-4 py-5 sm:p-6">
      <dt className="flex justify-between text-base font-normal text-secondary">
        <span>{name}</span>
      </dt>
      <dd className="mt-1 flex items-baseline">
        {currentAmount !== undefined ? (
          <>
            <span className="flex items-baseline text-lg font-semibold text-ternary sm:text-2xl">
              {currentAmount?.toFixed(0) ?? 0}
            </span>
            <span className="text-xs text-ternary sm:text-lg">{unit}</span>
            <span className="flex items-baseline text-lg font-semibold text-ternary sm:text-2xl">
              /
            </span>
          </>
        ) : null}
        <span className="flex items-baseline text-lg font-semibold text-ternary sm:text-2xl">
          {amount?.toFixed(0)}
        </span>
        <span className="flex items-baseline text-lg font-semibold text-ternary sm:text-2xl">
          {amountHigh ? `-${amountHigh.toFixed(0)}` : null}
        </span>
        <span className="text-xs text-ternary sm:text-lg">{unit}</span>
      </dd>
      {currentAmount !== undefined ? (
        <div className="relative mt-4">
          <div className="mb-4 flex h-2 overflow-hidden rounded bg-secondary-light text-xs shadow-inner">
            <div
              style={{
                width: `${
                  ((currentAmount ?? 0) / (amountHigh ? amountHigh : amount)) *
                  100
                }%`,
              }}
              className={`flex flex-col justify-center whitespace-nowrap text-center text-white shadow-inner shadow-none ${
                percentage < 98
                  ? "bg-secondary"
                  : percentageHigh > 100
                    ? "bg-error"
                    : "bg-primary"
              }`}
            ></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
