import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserBloodPressure } from "@fitness/api-legacy";
import { LoadingSpinner } from "../../Loading/LoadingSpinner";
import { AllBloodPressureCard } from "./AllBloodPressureCard";

export const AllBloodPressure: FC = () => {
  const userBloodPressureQuery = useQuery(
    ["UserBloodPressure"],
    getAllUserBloodPressure,
  );

  if (userBloodPressureQuery.isLoading) return <LoadingSpinner />;

  const weights = userBloodPressureQuery.data?.data.sort((a, b) =>
    a.created < b.created ? 1 : -1,
  );

  return (
    <div className="container grid grid-cols-1">
      <h2 className="text-2xl text-secondary">All Blood Pressure Records</h2>
      <div className=" grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {weights?.map((item) => (
          <AllBloodPressureCard
            id={item.id}
            date={item.created}
            defaultSystolic={item.systolic}
            defaultDiastolic={item.diastolic}
          />
        ))}
      </div>
    </div>
  );
};
