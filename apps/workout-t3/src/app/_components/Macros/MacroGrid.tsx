"use client";

import { FC, useContext, useState } from "react";
import { MacroGridUnit } from "./MacroGridUnit";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { getCurrentUserMacros } from "@fitness/api-legacy";
import { Units } from "@fitness/types";
import { LoadingMacroGrid } from "../Loading/LoadingMacroGrid";
import { UserContext } from "~/contexts/UserContext";
import { api } from "~/trpc/react";
import { LinkButton } from "~/app/_components/Buttons/LinkButton";
import { Scanner } from "~/app/_components/Scanner/Scanner";

export const MacroGrid: FC = () => {
  const { user } = useContext(UserContext);
  const [openScanner, setOpenScanner] = useState(false);

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
        />
        <dl className="mt-2 grid grid-cols-2 gap-2 overflow-hidden sm:grid-cols-4">
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
      <div className="flex w-full flex-row justify-between gap-2 pt-2">
        <LinkButton className="flex w-full justify-center" to={"/eat/add-food"}>
          Add Food
        </LinkButton>
        <Scanner
          buttonClassName="flex w-full justify-center"
          open={openScanner}
          setOpen={setOpenScanner}
        />
      </div>
    </div>
  );
};
