import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserWeights } from '../../../api';
import { Loading } from '../../Loading';
import { AllWeightCard } from './AllWeightCard';
import { useShowBackButton } from '../../Navigation/headerHooks';

export const AllWeights: FC = () => {
    useShowBackButton();
    const userWeightQuery = useQuery(['UserWeights'], getAllUserWeights);

    if (userWeightQuery.isLoading) return <Loading />;

    const weights = userWeightQuery.data?.data.sort((a, b) =>
        a.created < b.created ? 1 : -1
    );

    return (
        <div className="container grid grid-cols-1">
            <h2 className="text-2xl text-secondary">All Weights</h2>
            <div className=" grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                {weights?.map((item) => (
                    <AllWeightCard
                        id={item.id}
                        date={item.created}
                        defaultWeight={item.weight}
                    />
                ))}
            </div>
        </div>
    );
};
