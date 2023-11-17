import { FC, useContext } from "react";
import { MacroGridUnit } from "./MacroGridUnit";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { getCurrentUserMacros } from "@fitness/api-legacy";
import { Units } from "@fitness/types";
import { classNames } from "~/utils/classNames";
import { LoadingMacroGrid } from "../Loading/LoadingMacroGrid";
import { UserContext } from "~/contexts/UserContext";
import { api } from "~/trpc/react";

interface IProps {
  home?: boolean;
}

export const MacroGrid: FC<IProps> = ({ home }) => {
  const { user } = useContext(UserContext);

  const macrosQuery = api.macros.getMacros.useQuery();

  const currentMacrosQuery = useQuery(["CurrentMacros"], () => {
    return getCurrentUserMacros();
  });

  if (macrosQuery.isLoading || currentMacrosQuery.isLoading) {
    return <LoadingMacroGrid isLoading={true} />;
  }

  return (
    <div className="w-full">
      <>
        {currentMacrosQuery.isFetching ? (
          <div className="card my-2 flex items-center justify-start p-2">
            <LoadingSpinner />{" "}
            <span className="text-ternary">Fetching current macros...</span>
          </div>
        ) : null}
      </>
      <div className="w-full">
        <MacroGridUnit
          name="Calories"
          amount={macrosQuery.data?.Calories ?? 0}
          amountHigh={macrosQuery.data?.CaloriesHigh ?? 0}
          currentAmount={currentMacrosQuery.data?.data.calories}
          unit={user?.unit === Units.Imperial ? "Cal" : "kcal"}
          customMacros={!home}
        />
        <dl
          className={classNames(
            home ? "hidden md:grid" : "",
            "mt-2 grid grid-cols-2 gap-2 overflow-hidden sm:grid-cols-4",
          )}
        >
          <MacroGridUnit
            name="Protein"
            amount={macrosQuery.data?.Protein ?? 0}
            amountHigh={macrosQuery.data?.ProteinHigh ?? 0}
            currentAmount={currentMacrosQuery.data?.data?.protein ?? 0}
            unit="g"
          />
          <MacroGridUnit
            name="Fat"
            amount={macrosQuery.data?.Fat ?? 0}
            amountHigh={macrosQuery.data?.FatHigh ?? 0}
            currentAmount={currentMacrosQuery.data?.data?.fat ?? 0}
            unit="g"
          />
          <MacroGridUnit
            name="Carbs"
            amount={macrosQuery.data?.Carbs ?? 0}
            amountHigh={macrosQuery.data?.CarbsHigh ?? 0}
            currentAmount={currentMacrosQuery.data?.data?.carbs ?? 0}
            unit="g"
          />
          <MacroGridUnit
            name="Fiber"
            amount={macrosQuery.data?.Fiber ?? 0}
            amountHigh={macrosQuery.data?.FiberHigh ?? 0}
            currentAmount={currentMacrosQuery.data?.data?.fiber ?? 0}
            unit="g"
          />
        </dl>
      </div>
    </div>
  );
};
