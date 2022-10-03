import { FC, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SupplementCard } from './SupplementCard';
import { AuthContext } from '../../Auth/Auth';
import { getUserSupplements } from '../../api';
import { Loading } from '../Loading';

export const UserSupplements: FC = () => {
    const { user } = useContext(AuthContext);

    const userSupplementsQuery = useQuery(['UserSupplements', user?.id], () => {
        if (!user) return;
        return getUserSupplements(user?.id);
    });

    if (userSupplementsQuery.isLoading) {
        return <Loading />;
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
        <>
            {(morningSups?.length ?? 0) > 0 ? (
                <>
                    <h2 className="text-secondary">Morning</h2>
                    {morningSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-Morning`}
                            name={userSupplement.supplement!.name}
                            times={['Morning']}
                        />
                    ))}
                </>
            ) : (
                <div />
            )}
            {(breakfastSups?.length ?? 0) > 0 ? (
                <>
                    <h2 className="text-secondary">Breakfast</h2>
                    {breakfastSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-Breakfast`}
                            name={userSupplement.supplement!.name}
                            times={['Breakfast']}
                        />
                    ))}
                </>
            ) : (
                <div />
            )}
            {(lunchSups?.length ?? 0) > 0 ? (
                <>
                    <h2 className="text-secondary">Lunch</h2>
                    {lunchSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-Lunch`}
                            name={userSupplement.supplement!.name}
                            times={['Lunch']}
                        />
                    ))}
                </>
            ) : (
                <div />
            )}
            {(preWorkoutSups?.length ?? 0) > 0 ? (
                <>
                    <h2 className="text-secondary">PreWorkout</h2>
                    {preWorkoutSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-PreWorkout`}
                            name={userSupplement.supplement!.name}
                            times={['PreWorkout']}
                        />
                    ))}
                </>
            ) : (
                <div />
            )}
            {(postWorkoutSups?.length ?? 0) > 0 ? (
                <>
                    <h2 className="text-secondary">PostWorkout</h2>
                    {postWorkoutSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-PostWorkout`}
                            name={userSupplement.supplement!.name}
                            times={['PostWorkout']}
                        />
                    ))}
                </>
            ) : (
                <div />
            )}
            {(dinnerSups?.length ?? 0) > 0 ? (
                <>
                    <h2 className="text-secondary">Dinner</h2>
                    {dinnerSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-Dinner`}
                            name={userSupplement.supplement!.name}
                            times={['Dinner']}
                        />
                    ))}
                </>
            ) : (
                <div />
            )}
            {(eveningSups?.length ?? 0) > 0 ? (
                <>
                    <h2 className="text-secondary">Evening</h2>
                    {eveningSups?.map((userSupplement) => (
                        <SupplementCard
                            isUser={true}
                            id={userSupplement.id ?? -1}
                            userSupplementId={userSupplement.id}
                            key={`${userSupplement.supplementId}-Evening`}
                            name={userSupplement.supplement!.name}
                            times={['Evening']}
                        />
                    ))}
                </>
            ) : (
                <div />
            )}
        </>
    );
};
