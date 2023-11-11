"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserWeights } from "@fitness/api-legacy";
import { LoadingSpinner } from "../../Loading/LoadingSpinner";
import { AllWeightCard } from "./AllWeightCard";

export const AllWeights: FC = () => {
  const userWeightQuery = useQuery(["UserWeights"], getAllUserWeights);

  if (userWeightQuery.isLoading) return <LoadingSpinner />;

  const weights = userWeightQuery.data?.data.sort((a, b) =>
    a.created < b.created ? 1 : -1,
  );

  return (
    <div className="container grid grid-cols-1">
      <h2 className="text-2xl text-secondary">All Weights</h2>
      <div className=" grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {weights?.map((item) => (
          <AllWeightCard
            id={item.id}
            date={item.created}
            defaultWeight={item.weight}
          />
        ))}
      </div>
    </div>
  );
};