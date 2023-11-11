import { FC, useMemo, useState } from "react";
import { AddSupplement } from "./AddSupplement";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import {
  getUserSupplementActivity,
  toggleUserSupplementActivity,
} from "@fitness/api-legacy";
import { SupplementIcon } from "@fitness/types";
import { Capsule } from "../Icons/Capsule";
import { Injection } from "../Icons/Injection";
import { Tablet } from "../Icons/Tablet";
import { CircleCheckSolid } from "../Icons/CircleCheckSolid";
import { LargeScoop } from "../Icons/LargeScoop";
import { SmallScoop } from "../Icons/SmallScoop";
import { Liquid } from "../Icons/Liquid";

interface IProps {
  isUser: boolean;
  id: number;
  name: string;
  times?: string[];
  userSupplementId?: number;
  icon?: SupplementIcon;
}

export interface Time {
  name: string;
  enabled: boolean;
}

const mapToIcon = (icon?: SupplementIcon) => {
  switch (icon) {
    case SupplementIcon.Capsule:
      return <Capsule className="w-6 fill-primary-dark" />;
    case SupplementIcon.Tablet:
      return <Tablet className="w-6 fill-primary-dark" />;
    case SupplementIcon.Injection:
      return <Injection className="w-6 fill-primary-dark" />;
    case SupplementIcon.LargeScoop:
      return <LargeScoop className="w-6 fill-primary-dark" />;
    case SupplementIcon.SmallScoop:
      return <SmallScoop className="w-6 fill-primary-dark" />;
    case SupplementIcon.Liquid:
      return <Liquid className="w-6 fill-primary-dark" />;
    default:
      return <></>;
  }
};

export const SupplementCard: FC<IProps> = ({
  isUser,
  id,
  name,
  times,
  userSupplementId,
  icon,
}) => {
  const userId = localStorage.getItem("userId") ?? "";
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const today = new Date().toDateString();

  const userSupplementActivityQuery = useQuery(
    ["UserSupplementActivity", today, id, times?.at(0)],
    () => {
      if (!times || !times[0]) return;

      return getUserSupplementActivity(id, times[0]);
    },
  );

  useMemo(() => {
    if (userSupplementActivityQuery.data?.data) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [userSupplementActivityQuery.data]);

  const mutation = useMutation(toggleUserSupplementActivity, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "UserSupplementActivity",
        today,
        userId,
        id,
        times?.at(0),
      ]);
    },
  });

  const handleCheck = () => {
    if (!times || !times[0]) return;

    mutation.mutate({
      date: today,
      userId,
      userSupplementId: id,
      time: times[0],
    });
  };

  return (
    <div>
      <button
        onClick={() => (isUser ? handleCheck() : setOpen(true))}
        className={`${
          checked ? "bg-primary-dark" : "card"
        } my-2 flex w-full items-center justify-between overflow-hidden rounded p-4 text-left shadow-lg`}
      >
        <div className="flex items-center">
          <div className="mr-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ternary">
              <div>{mapToIcon(icon)}</div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-secondary">{name}</span>
            <div>
              {times?.map((time, index) => (
                <span className="mr-1 text-xs text-ternary" key={time}>
                  {time} {index !== times.length - 1 && "|"}
                </span>
              ))}
            </div>
          </div>
        </div>
        {isUser &&
          checked &&
          !mutation.isLoading &&
          !userSupplementActivityQuery.isFetching && (
            <CircleCheckSolid className="h-8 w-8 fill-secondary" />
          )}
        {isUser &&
          (mutation.isLoading || userSupplementActivityQuery.isFetching) && (
            <LoadingSpinner />
          )}
      </button>
      <AddSupplement
        open={open}
        setOpen={setOpen}
        userId={userId}
        supplementId={id}
        userSupplementId={userSupplementId}
        defaultTimes={times ?? []}
      />
    </div>
  );
};