import { FC, useContext, useMemo, useState } from 'react';
import { AddSupplement } from './AddSupplement';
import { AuthContext } from '../../Auth/Auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ExternalLink } from '../../icons/ExternalLink';
import { Loading } from '../Loading';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import {
    getUserSupplementActivity,
    toggleUserSupplementActivity,
} from '../../api';

interface IProps {
    isUser: boolean;
    id: number;
    name: string;
    brand?: string;
    times?: string[];
    url?: string;
    commission?: number;
    userSupplementId?: number;
}

export interface Time {
    name: string;
    enabled: boolean;
}

export const SupplementCard: FC<IProps> = ({
    isUser,
    id,
    name,
    brand,
    times,
    url,
    commission,
    userSupplementId,
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
        <>
            <button
                onClick={() => (isUser ? handleCheck() : setOpen(true))}
                className={`${
                    checked ? 'bg-primary-dark' : 'bg-card'
                } rounded overflow-hidden shadow-lg p-4 my-2 flex justify-between items-center w-full text-left`}
            >
                <div className="flex items-center">
                    <div className="mr-4">
                        <div className="bg-ternary w-8 h-8 rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg text-secondary">{name}</span>
                        {brand && (
                            <span className="text-xs text-ternary">
                                {brand}
                            </span>
                        )}
                        {commission ? (
                            <span className="text-xs text-ternary">
                                {commission}%
                            </span>
                        ) : (
                            <div />
                        )}
                        <div>
                            {times?.map((time) => (
                                <span
                                    className="text-xs mr-2 text-ternary"
                                    key={time}
                                >
                                    {time}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                {isUser &&
                    checked &&
                    !mutation.isLoading &&
                    !userSupplementActivityQuery.isFetching && (
                        <CheckCircleIcon className="fill-secondary w-8 h-8" />
                    )}
                {isUser &&
                    (mutation.isLoading ||
                        userSupplementActivityQuery.isFetching) && <Loading />}
                {url && (
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="fill-ternary h-5 w-5"
                    >
                        <ExternalLink />
                    </a>
                )}
            </button>
            <AddSupplement
                open={open}
                setOpen={setOpen}
                userId={user!.id}
                supplementId={id}
                userSupplementId={userSupplementId}
            />
        </>
    );
};
