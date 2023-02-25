import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserBodies } from '../../../api';
import { Loading } from '../../Loading';
import { AllBodyCard } from './AllBodyCard';
import { useShowBackButton } from '../../Navigation/headerHooks';

export const AllBody: FC = () => {
    useShowBackButton();
    const userBodiesQuery = useQuery(['UserBodies'], getAllUserBodies);

    if (userBodiesQuery.isLoading) return <Loading />;

    const bodies = userBodiesQuery.data?.data.sort((a, b) =>
        a.created < b.created ? 1 : -1
    );

    return (
        <div className="container grid grid-cols-1">
            <h2 className="text-2xl text-secondary">All Body Records</h2>
            <div className=" grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                {bodies?.map((item) => (
                    <AllBodyCard
                        id={item.id!}
                        date={item.created}
                        defaultBody={item}
                    />
                ))}
            </div>
        </div>
    );
};
