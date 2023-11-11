import React, { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  ScatterDataPoint,
  BubbleDataPoint,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { LinkButton } from "../../Buttons/LinkButton";
import { getAllUserBodies } from "@fitness/api-legacy";
import { LinkSecondaryButton } from "../../Buttons/LinkSecondaryButton";
import { LoadingCard } from "../../Loading/LoadingCard";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export const BodyGraph = () => {
  const [data, setData] = useState<
    | ChartData<
        "radar",
        (number | ScatterDataPoint | BubbleDataPoint | null)[],
        unknown
      >
    | undefined
  >(undefined);

  const userBodyQuery = useQuery(["UserBody"], getAllUserBodies);

  useMemo(() => {
    const userBody = userBodyQuery.data?.data;

    if (!userBody) {
      return;
    }

    let graphedData = [];
    if (userBody?.length > 3) {
      graphedData.push(userBody[0]);
      graphedData.push(userBody[Math.floor(userBody.length / 2)]);
      graphedData.push(userBody[userBody.length - 1]);
    } else {
      graphedData = userBody;
    }

    const backgrounds = [
      "rgba(40, 130, 122, 0.2)",
      "rgba(175, 210, 87, 0.2)",
      "rgba(247, 198, 25, 0.2)",
    ];
    const colors = ["#28827A", "#AFD257", "#F7C619"];

    setData({
      labels: [
        "Neck",
        "Shoulders",
        "Chest",
        "Left Bicep",
        "Right Bicep",
        "Navel",
        "Waist",
        "Hip",
        "Left Thigh",
        "Right Thigh",
        "Left Calf",
        "Right Calf",
      ],
      datasets:
        graphedData.map((item, index) => ({
          label: format(new Date(item.created), "PP"),
          data: [
            item.neck,
            item.shoulders,
            item.chest,
            item.leftBicep,
            item.rightBicep,
            item.navel,
            item.waist,
            item.hip,
            item.leftThigh,
            item.rightThigh,
            item.leftCalf,
            item.rightCalf,
          ],
          backgroundColor: backgrounds[index],
          borderColor: colors[index],
          borderWidth: 1,
        })) ?? [],
    });
  }, [userBodyQuery.data]);

  if (userBodyQuery.isLoading || !data) {
    return <LoadingCard isLoading />;
  }

  return (
    <div className="card w-full rounded p-4 shadow">
      <div className="flex flex-row">
        <LinkButton to="body/body/all" className="mr-2">
          See All
        </LinkButton>
        <LinkSecondaryButton to="body/body">Add</LinkSecondaryButton>
      </div>
      {data.datasets.length > 0 ? (
        <Radar data={data} />
      ) : (
        <span className="text-ternary">
          Use the Add button to add body measurements
        </span>
      )}
    </div>
  );
};
