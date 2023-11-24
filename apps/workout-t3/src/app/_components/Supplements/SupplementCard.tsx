import { FC, useEffect, useState } from 'react';
import { AddSupplement } from './AddSupplement';
import { SupplementIcon } from '@fitness/types';
import { Capsule } from '../Icons/Capsule';
import { Injection } from '../Icons/Injection';
import { Tablet } from '../Icons/Tablet';
import { LargeScoop } from '../Icons/LargeScoop';
import { SmallScoop } from '../Icons/SmallScoop';
import { Liquid } from '../Icons/Liquid';
import { api } from '~/trpc/react';
import { CircleCheckSolid } from '~/app/_components/Icons/CircleCheckSolid';
import { LoadingSpinner } from '~/app/_components/Loading/LoadingSpinner';

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
            return <Capsule className="fill-primary-dark w-6" />;
        case SupplementIcon.Tablet:
            return <Tablet className="fill-primary-dark w-6" />;
        case SupplementIcon.Injection:
            return <Injection className="fill-primary-dark w-6" />;
        case SupplementIcon.LargeScoop:
            return <LargeScoop className="fill-primary-dark w-6" />;
        case SupplementIcon.SmallScoop:
            return <SmallScoop className="fill-primary-dark w-6" />;
        case SupplementIcon.Liquid:
            return <Liquid className="fill-primary-dark w-6" />;
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
                    isUser &&
                    !!times?.length &&
                    !!supplementId &&
                    !!userSupplementId,
            }
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
                    checked ? 'bg-primary-dark' : 'card'
                } my-2 flex w-full items-center justify-between overflow-hidden rounded p-4 text-left shadow-lg`}
            >
                <div className="flex items-center">
                    <div className="mr-4">
                        <div className="bg-ternary flex h-8 w-8 items-center justify-center rounded-full">
                            <div>{mapToIcon(icon)}</div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-secondary text-lg">{name}</span>
                        <div>
                            {times?.map((time, index) => (
                                <span
                                    className="text-ternary mr-1 text-xs"
                                    key={time}
                                >
                                    {time} {index !== times.length - 1 && '|'}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                {isUser &&
                    checked &&
                    !mutation.isLoading &&
                    !userSupplementActivityQuery.isFetching && (
                        <CircleCheckSolid className="fill-secondary h-8 w-8" />
                    )}
                {isUser &&
                    (mutation.isLoading ||
                        userSupplementActivityQuery.isFetching) && (
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
