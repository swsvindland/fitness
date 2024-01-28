import { FC } from 'react';
import { WeightCard } from './WeightCard';
import { api } from '~/trpc/server';
import { CreateWeight } from '~/app/_components/Weights/CreateWeight';

export const AllWeights: FC = async () => {
    const userBloodPressureQuery = await api.body.getAllWeights.query();

    return (
        <div className="container grid grid-cols-1">
            <div className=" grid grid-cols-1 gap-2">
                {userBloodPressureQuery?.map((item) => (
                    <WeightCard
                        id={Number(item.Id)}
                        date={item.Created.toDateString()}
                        weight={item.Weight}
                    />
                ))}
            </div>
            <CreateWeight />
        </div>
    );
};
