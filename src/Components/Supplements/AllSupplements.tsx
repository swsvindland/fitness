import { FC, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SupplementCard } from './SupplementCard';
import { getAllSupplements, getUserSupplements } from '../../api';
import { AuthContext } from '../../Auth/Auth';
import { Loading } from '../Loading';
import { useShowBackButton } from '../Navigation/headerHooks';

export const AllSupplements: FC = () => {
    const { user } = useContext(AuthContext);
    useShowBackButton();

    const allSupplementQuery = useQuery(['Supplements'], getAllSupplements);
    const userSupplementsQuery = useQuery(['UserSupplements', user?.id], () => {
        if (!user) return;
        return getUserSupplements();
    });

    if (allSupplementQuery.isLoading || userSupplementsQuery.isLoading) {
        return <Loading />;
    }

    const userSupIds = userSupplementsQuery.data?.data.map(
        (userSup) => userSup.supplement?.id
    );

    const filteredAllSupplements = allSupplementQuery.data?.data.filter(
        (item) => userSupIds?.indexOf(item.id) === -1
    );

    return (
        <div className="max-w-2xl w-full">
            <h2 className="text-lg text-secondary my-4 ">Active</h2>
            {userSupplementsQuery.data?.data.map((supplement) => (
                <SupplementCard
                    isUser={false}
                    key={supplement.id}
                    id={supplement.supplementId}
                    name={supplement.supplement?.name ?? ''}
                    brand={supplement.supplement?.brand}
                    times={supplement.times}
                    url={supplement.supplement?.url}
                    commission={supplement.supplement?.commission}
                    userSupplementId={supplement.id}
                />
            ))}
            <h2 className="text-lg text-secondary my-4">all</h2>
            {filteredAllSupplements?.map((supplement) => (
                <SupplementCard
                    isUser={false}
                    key={supplement.id}
                    id={supplement.id}
                    name={supplement.name}
                    brand={supplement.brand}
                    url={supplement.url}
                    commission={supplement.commission}
                />
            ))}
        </div>
    );
};
