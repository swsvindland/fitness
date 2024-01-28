import { FC } from 'react';
import { BodyCard } from './BodyCard';
import { api } from '~/trpc/server';
import { CreateBody } from './CreateBody';

export const AllBodies: FC = async () => {
    const userBodyQuery = await api.body.getAllBodies.query();

    return (
        <div className="container grid grid-cols-1">
            <div className=" grid grid-cols-1 gap-2">
                {userBodyQuery?.map((item) => (
                    <BodyCard
                        id={Number(item.Id)}
                        date={item.Created.toDateString()}
                        body={{
                            neck: item.Neck.toString(),
                            shoulders: item.Shoulders.toString(),
                            chest: item.Chest.toString(),
                            leftBicep: item.LeftBicep.toString(),
                            rightBicep: item.RightBicep.toString(),
                            waist: item.Waist.toString(),
                            navel: item.Navel.toString(),
                            hip: item.Hip.toString(),
                            leftThigh: item.LeftThigh.toString(),
                            rightThigh: item.RightThigh.toString(),
                            leftCalf: item.LeftCalf.toString(),
                            rightCalf: item.RightCalf.toString(),
                        }}
                    />
                ))}
            </div>
            <CreateBody />
        </div>
    );
};
