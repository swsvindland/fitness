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
        <div className="max-w-2xl w-full grid grid-cols-1">
            <h2 className="text-2xl text-secondary">
                All Blood Pressure Records
            </h2>
            {bodies?.map((item) => (
                <AllBodyCard
                    id={item.id!}
                    date={item.created}
                    defaultBody={item}
                />
            ))}
        </div>
    );
};
