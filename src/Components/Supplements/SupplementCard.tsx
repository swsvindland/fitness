import { FC, useContext, useMemo, useState } from 'react';
import { AddSupplement } from './AddSupplement';
import { AuthContext } from '../Auth/Auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import {
    getUserSupplementActivity,
    toggleUserSupplementActivity,
} from '../../api';
import { SupplementIcon } from '../../types/Supplement';
import { Capsule } from '../Icons/Capsule';
import { Injection } from '../Icons/Injection';
import { Tablet } from '../Icons/Tablet';
import { CircleCheckSolid } from '../Icons/CircleCheckSolid';
import { LargeScoop } from '../Icons/LargeScoop';
import { SmallScoop } from '../Icons/SmallScoop';
import { Liquid } from '../Icons/Liquid';

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
            return <Capsule className="w-6 fill-white dark:fill-black" />;
        case SupplementIcon.Tablet:
            return <Tablet className="w-6 fill-white dark:fill-black" />;
        case SupplementIcon.Injection:
            return <Injection className="w-6 fill-white dark:fill-black" />;
        case SupplementIcon.LargeScoop:
            return <LargeScoop className="w-6 fill-white dark:fill-black" />;
        case SupplementIcon.SmallScoop:
            return <SmallScoop className="w-6 fill-white dark:fill-black" />;
        case SupplementIcon.Liquid:
            return <Liquid className="w-6 fill-white dark:fill-black" />;
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
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const today = new Date().toDateString();

    const userSupplementActivityQuery = useQuery(
        ['UserSupplementActivity', today, user?.id, id, times?.at(0)],
        () => {
            if (!user) return;
            if (!times || !times[0]) return;

            return getUserSupplementActivity(id, times[0]);
        }
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
                'UserSupplementActivity',
                today,
                user?.id,
                id,
                times?.at(0),
            ]);
        },
    });

    const handleCheck = () => {
        if (!user) return;
        if (!times || !times[0]) return;

        mutation.mutate({
            date: today,
            userId: user.id,
            userSupplementId: id,
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
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500">
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
                userId={user!.id}
                supplementId={id}
                userSupplementId={userSupplementId}
                defaultTimes={times ?? []}
            />
        </div>
    );
};
