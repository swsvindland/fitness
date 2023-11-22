import { FC, useEffect, useState } from "react";
import { AddSupplement } from "./AddSupplement";
import { SupplementIcon } from "@fitness/types";
import { Capsule } from "../Icons/Capsule";
import { Injection } from "../Icons/Injection";
import { Tablet } from "../Icons/Tablet";
import { LargeScoop } from "../Icons/LargeScoop";
import { SmallScoop } from "../Icons/SmallScoop";
import { Liquid } from "../Icons/Liquid";
import { api } from "~/trpc/react";
import { CircleCheckSolid } from "~/app/_components/Icons/CircleCheckSolid";
import { LoadingSpinner } from "~/app/_components/Loading/LoadingSpinner";

interface IProps {
  isUser: boolean;
  name: string;
  times?: string[];
  supplementId: number;
  userSupplementId?: number;
  icon?: string;
}

export interface Time {
  name: string;
  enabled: boolean;
}

const mapToIcon = (icon?: string) => {
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
  name,
  times,
  supplementId,
  userSupplementId,
  icon,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const today = new Date();
  const utils = api.useUtils();

  const mutation = api.supplements.toggleUserSupplementActivity.useMutation({
    onSuccess: async () => {
      await utils.supplements.getUserSupplementActivity.invalidate();
    },
  });

  const userSupplementActivityQuery =
    api.supplements.getUserSupplementActivity.useQuery(
      {
        date: today.toDateString(),
        supplementId: supplementId,
        userSupplementId: userSupplementId ?? null,
        time: times ? times?.at(0) ?? null : null,
      },
      {
        enabled:
          isUser && !!times?.length && !!supplementId && !!userSupplementId,
      },
    );

  useEffect(() => {
    if (userSupplementActivityQuery?.data) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [userSupplementActivityQuery?.data]);

  const handleCheck = () => {
    if (!times || !times[0]) return;
    if (!userSupplementId) return;
    if (mutation.isLoading) return;

    mutation.mutate({
      date: today,
      userSupplementId: userSupplementId,
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
        supplementId={supplementId}
        userSupplementId={userSupplementId}
        defaultTimes={times ?? []}
      />
    </div>
  );
};
