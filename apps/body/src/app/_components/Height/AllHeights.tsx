'use client';

import { FC } from 'react';
import { HeightCard } from './HeightCard';
import { api } from '~/trpc/react';
import { LoadingPage } from '@fitness/ui';
import { CreateHeight } from '~/app/_components/Height/CreateHeight';

export const AllHeights: FC = () => {
    const userHeights = api.body.getAllHeights.useQuery();

    if (userHeights.isLoading) return <LoadingPage />;

    return (
        <div className="container grid grid-cols-1">
            <div className=" grid grid-cols-1 gap-2">
                {userHeights.data?.map((item) => (
                    <HeightCard
                        id={Number(item.Id)}
                        date={item.Created.toDateString()}
                        height={item.Height}
                    />
                ))}
            </div>
            <CreateHeight />
        </div>
    );
};
