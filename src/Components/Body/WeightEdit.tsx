import { useQuery } from '@tanstack/react-query';
import { getAllUserWeights } from '../../api';
import { FC } from 'react';
import { Loading } from '../Loading';

export const WeightEdit: FC = () => {
    const userWeightQuery = useQuery(['UserWeight'], getAllUserWeights);

    if (userWeightQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Weight</h1>
            {userWeightQuery.data?.data.map((item) => (
                <div key={item.id}>
                    <p>{item.weight}</p>
                </div>
            ))}
        </div>
    );
};
