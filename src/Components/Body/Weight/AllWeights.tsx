import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserWeights } from '../../../api';
import { Loading } from '../../Loading';
import { AllWeightCard } from './AllWeightCard';

export const AllWeights: FC = () => {
    const userWeightQuery = useQuery(['UserWeights'], getAllUserWeights);

    if (userWeightQuery.isLoading) return <Loading />;

    const weights = userWeightQuery.data?.data.sort((a, b) =>
        a.created < b.created ? 1 : -1
    );

    return (
        <div className="max-w-2xl w-full grid grid-cols-1">
            <h2 className="text-2xl text-secondary">All Weights</h2>
            {weights?.map((item) => (
                <AllWeightCard
                    id={item.id}
                    date={item.created}
                    defaultWeight={item.weight}
                />
            ))}
        </div>
    );
};
