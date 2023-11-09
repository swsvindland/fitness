import { FC, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SupplementCard } from './SupplementCard';
import { AuthContext } from '../Auth/Auth';
import { getUserSupplements } from '@fitness/api-legacy';
import { useShowBackButton } from '../Navigation/headerHooks';
import { LoadingListOfCards } from '../Loading/LoadingListOfCards';

export const UserSupplements: FC = () => {
    const { user } = useContext(AuthContext);
    useShowBackButton();

    const userSupplementsQuery = useQuery(['UserSupplements', user?.id], () => {
        return getUserSupplements();
    });

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

    const morningSups = userSupplementsQuery.data?.data.filter((item) =>
        item.times.includes('Morning')
    );
    const breakfastSups = userSupplementsQuery.data?.data.filter((item) =>
        item.times.includes('Breakfast')
    );
    const lunchSups = userSupplementsQuery.data?.data.filter((item) =>
        item.times.includes('Lunch')
    );
    const preWorkoutSups = userSupplementsQuery.data?.data.filter((item) =>
        item.times.includes('PreWorkout')
    );
    const postWorkoutSups = userSupplementsQuery.data?.data.filter((item) =>
        item.times.includes('PostWorkout')
    );
    const dinnerSups = userSupplementsQuery.data?.data.filter((item) =>
        item.times.includes('Dinner')
    );
    const eveningSups = userSupplementsQuery.data?.data.filter((item) =>
        item.times.includes('Evening')
    );

    return (
        <div className="grid grid-cols-1 items-start gap-2">
            {(morningSups?.length ?? 0) > 0 ? (
                <div className="grid grid-cols-1">
                    <h2 className="text-secondary">Morning</h2>
                    {morningSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-Morning`}
                            name={userSupplement.supplement!.name}
                            times={['Morning']}
                            icon={userSupplement.supplement!.icon}
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
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-Breakfast`}
                            name={userSupplement.supplement!.name}
                            times={['Breakfast']}
                            icon={userSupplement.supplement!.icon}
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
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-Lunch`}
                            name={userSupplement.supplement!.name}
                            times={['Lunch']}
                            icon={userSupplement.supplement!.icon}
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
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-PreWorkout`}
                            name={userSupplement.supplement!.name}
                            times={['PreWorkout']}
                            icon={userSupplement.supplement!.icon}
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
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-PostWorkout`}
                            name={userSupplement.supplement!.name}
                            times={['PostWorkout']}
                            icon={userSupplement.supplement!.icon}
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
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-Dinner`}
                            name={userSupplement.supplement!.name}
                            times={['Dinner']}
                            icon={userSupplement.supplement!.icon}
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
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-Evening`}
                            name={userSupplement.supplement!.name}
                            times={['Evening']}
                            icon={userSupplement.supplement!.icon}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
};
