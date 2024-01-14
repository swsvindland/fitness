'use client';

import { FC } from 'react';
import { SupplementCard } from './SupplementCard';
import { api } from '~/trpc/react';
import { LoadingListOfCards } from '@fitness/ui';

export const UserSupplements: FC = () => {
    const userSupplementsQuery = api.supplements.getUserSupplements.useQuery();

    const morningSups = userSupplementsQuery.data?.filter((item) =>
        item.Times.includes('Morning')
    );
    const breakfastSups = userSupplementsQuery.data?.filter((item) =>
        item.Times.includes('Breakfast')
    );
    const lunchSups = userSupplementsQuery.data?.filter((item) =>
        item.Times.includes('Lunch')
    );
    const preWorkoutSups = userSupplementsQuery.data?.filter((item) =>
        item.Times.includes('PreWorkout')
    );
    const postWorkoutSups = userSupplementsQuery.data?.filter((item) =>
        item.Times.includes('PostWorkout')
    );
    const dinnerSups = userSupplementsQuery.data?.filter((item) =>
        item.Times.includes('Dinner')
    );
    const eveningSups = userSupplementsQuery.data?.filter((item) =>
        item.Times.includes('Evening')
    );

    if (userSupplementsQuery.isLoading) {
        return (
            <div className="grid grid-cols-1 items-start gap-2">
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">Morning</h2>
                    <LoadingListOfCards
                        isLoading={userSupplementsQuery.isLoading}
                    />
                </div>
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">Breakfast</h2>
                    <LoadingListOfCards
                        isLoading={userSupplementsQuery.isLoading}
                    />
                </div>
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">Lunch</h2>
                    <LoadingListOfCards
                        isLoading={userSupplementsQuery.isLoading}
                    />
                </div>
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">PreWorkout</h2>
                    <LoadingListOfCards
                        isLoading={userSupplementsQuery.isLoading}
                    />
                </div>
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">PostWorkout</h2>
                    <LoadingListOfCards
                        isLoading={userSupplementsQuery.isLoading}
                    />
                </div>
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">Dinner</h2>
                    <LoadingListOfCards
                        isLoading={userSupplementsQuery.isLoading}
                    />
                </div>
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">Evening</h2>
                    <LoadingListOfCards
                        isLoading={userSupplementsQuery.isLoading}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 items-start gap-2">
            {(morningSups?.length ?? 0) > 0 ? (
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">Morning</h2>
                    {morningSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            supplementId={Number(
                                userSupplement.SupplementId ?? -1
                            )}
                            userSupplementId={Number(userSupplement.Id)}
                            key={`${userSupplement.SupplementId}-Morning`}
                            name={userSupplement.Supplement!.Name}
                            times={['Morning']}
                            icon={userSupplement.Supplement!.Icon ?? undefined}
                        />
                    ))}
                </div>
            ) : null}
            {(breakfastSups?.length ?? 0) > 0 ? (
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">Breakfast</h2>
                    {breakfastSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            supplementId={Number(
                                userSupplement.SupplementId ?? -1
                            )}
                            userSupplementId={Number(userSupplement.Id)}
                            key={`${userSupplement.SupplementId}-Breakfast`}
                            name={userSupplement.Supplement!.Name}
                            times={['Breakfast']}
                            icon={userSupplement.Supplement!.Icon ?? undefined}
                        />
                    ))}
                </div>
            ) : null}
            {(lunchSups?.length ?? 0) > 0 ? (
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">Lunch</h2>
                    {lunchSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            supplementId={Number(
                                userSupplement.SupplementId ?? -1
                            )}
                            userSupplementId={Number(userSupplement.Id)}
                            key={`${userSupplement.SupplementId}-Lunch`}
                            name={userSupplement.Supplement!.Name}
                            times={['Lunch']}
                            icon={userSupplement.Supplement!.Icon ?? undefined}
                        />
                    ))}
                </div>
            ) : null}
            {(preWorkoutSups?.length ?? 0) > 0 ? (
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">PreWorkout</h2>
                    {preWorkoutSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            supplementId={Number(
                                userSupplement.SupplementId ?? -1
                            )}
                            userSupplementId={Number(userSupplement.Id)}
                            key={`${userSupplement.SupplementId}-PreWorkout`}
                            name={userSupplement.Supplement!.Name}
                            times={['PreWorkout']}
                            icon={userSupplement.Supplement!.Icon ?? undefined}
                        />
                    ))}
                </div>
            ) : null}
            {(postWorkoutSups?.length ?? 0) > 0 ? (
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">PostWorkout</h2>
                    {postWorkoutSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            supplementId={Number(
                                userSupplement.SupplementId ?? -1
                            )}
                            userSupplementId={Number(userSupplement.Id)}
                            key={`${userSupplement.SupplementId}-PostWorkout`}
                            name={userSupplement.Supplement!.Name}
                            times={['PostWorkout']}
                            icon={userSupplement.Supplement!.Icon ?? undefined}
                        />
                    ))}
                </div>
            ) : null}
            {(dinnerSups?.length ?? 0) > 0 ? (
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">Dinner</h2>
                    {dinnerSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            supplementId={Number(
                                userSupplement.SupplementId ?? -1
                            )}
                            userSupplementId={Number(userSupplement.Id)}
                            key={`${userSupplement.SupplementId}-Dinner`}
                            name={userSupplement.Supplement!.Name}
                            times={['Dinner']}
                            icon={userSupplement.Supplement!.Icon ?? undefined}
                        />
                    ))}
                </div>
            ) : null}
            {(eveningSups?.length ?? 0) > 0 ? (
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">Evening</h2>
                    {eveningSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            supplementId={Number(
                                userSupplement.SupplementId ?? -1
                            )}
                            userSupplementId={Number(userSupplement.Id)}
                            key={`${userSupplement.SupplementId}-Evening`}
                            name={userSupplement.Supplement!.Name}
                            times={['Evening']}
                            icon={userSupplement.Supplement!.Icon ?? undefined}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
};
