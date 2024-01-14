'use client';

import { FC, useMemo, useState } from 'react';
import { SupplementCard } from './SupplementCard';
import { SupplementSearch } from './SupplementSearch';
import { api } from '~/trpc/react';
import { LoadingListOfCards } from '@fitness/ui';

export const AllSupplements: FC = () => {
    const [query, setQuery] = useState<string>('');
    const [selected, setSelected] = useState<string | undefined>(undefined);

    const allSupplementsQuery = api.supplements.getAllSupplements.useQuery();
    const userSupplementsQuery = api.supplements.getUserSupplements.useQuery();

    const userSupIds = useMemo(
        () =>
            userSupplementsQuery.data?.map((userSup) => userSup.Supplement?.Id),
        [userSupplementsQuery.data]
    );

    const filteredAllSupplements = useMemo(
        () =>
            allSupplementsQuery.data?.filter(
                (item) => userSupIds?.indexOf(item.Id) === -1
            ),
        [allSupplementsQuery.data]
    );

    if (allSupplementsQuery.isLoading || userSupplementsQuery.isLoading) {
        return <LoadingListOfCards isLoading />;
    }

    return (
        <div className="container">
            <SupplementSearch
                query={query}
                setQuery={setQuery}
                selected={selected}
                setSelected={setSelected}
                options={
                    allSupplementsQuery.data?.map((item) => item.Name) || []
                }
            />
            <h2 className="text-secondary my-4 text-lg ">Active</h2>
            {userSupplementsQuery.data
                ?.filter((item) =>
                    item.Supplement?.Name.toLowerCase().includes(
                        selected?.toLowerCase() ?? ''
                    )
                )
                .map((supplement) => (
                    <SupplementCard
                        isUser={false}
                        key={supplement.Id}
                        id={Number(supplement.SupplementId)}
                        name={supplement.Supplement?.Name ?? ''}
                        times={supplement.Times.split(',')}
                        userSupplementId={Number(supplement.Id)}
                        icon={supplement.Supplement?.Icon ?? undefined}
                    />
                ))}
            <h2 className="text-secondary my-4 text-lg">all</h2>
            {filteredAllSupplements
                ?.filter((item) =>
                    item?.Name.toLowerCase().includes(
                        selected?.toLowerCase() ?? ''
                    )
                )
                .map((supplement) => (
                    <SupplementCard
                        isUser={false}
                        key={supplement.Id}
                        id={Number(supplement.Id)}
                        name={supplement.Name}
                        icon={supplement?.Icon ?? undefined}
                    />
                ))}
        </div>
    );
};
