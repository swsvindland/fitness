import { FC } from 'react';
import { HeightCard } from './HeightCard';
import { api } from '~/trpc/server';
import { CreateHeight } from '~/app/_components/Height/CreateHeight';

export const AllHeights: FC = async () => {
    const userHeights = await api.body.getAllHeights.query();

    return (
        <div className="container grid grid-cols-1">
            <div className=" grid grid-cols-1 gap-2">
                {userHeights?.map((item) => (
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
