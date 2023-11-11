import React, { FC, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ScatterDataPoint,
  BubbleDataPoint,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { LinkButton } from "../../Buttons/LinkButton";
import { getAllUserWeights } from "@fitness/api-legacy";
import { LinkSecondaryButton } from "../../Buttons/LinkSecondaryButton";
import { LoadingCard } from "../../Loading/LoadingCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const WeightGraph: FC = () => {
  const [data, setData] = useState<
    | ChartData<"line", (number | ScatterDataPoint | BubbleDataPoint | null)[]>
    | undefined
  >(undefined);

  const userWeightQuery = useQuery(["UserWeight"], getAllUserWeights);

  useMemo(() => {
    const labels = userWeightQuery.data?.data
      .slice(1)
      .slice(-30)
      .map((item) => format(new Date(item.created), "PP"));

    setData({
      labels,
      datasets: [
        {
          label: "Weights",
          data:
            userWeightQuery.data?.data
              .slice(1)
              .slice(-30)
              .map((item) => item.weight) ?? [],
          borderColor: "rgba(247, 198, 25, 1)",
          backgroundColor: "rgba(247, 198, 25, 0.1)",
        },
      ],
    });
  }, [userWeightQuery.data]);

  if (userWeightQuery.isLoading || !data) {
    return <LoadingCard isLoading />;
  }

  return (
    <div className="card w-full rounded p-4 shadow">
      <div className="flex flex-row">
        <LinkButton to="/body/weight/all" className="mr-2">
          See All
        </LinkButton>
        <LinkSecondaryButton to="body/weight">Add</LinkSecondaryButton>
      </div>
      {(data.datasets.at(0)?.data.length ?? 0) > 0 ? (
        <Line data={data} />
      ) : (
        <span className="text-ternary">
          Use the Add button to add your weight
        </span>
      )}
    </div>
  );
};