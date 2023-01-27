import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserBloodPressure } from '../../../api';
import { Loading } from '../../Loading';
import { AllBloodPressureCard } from './AllBloodPressureCard';
import { useShowBackButton } from '../../Navigation/headerHooks';

export const AllBloodPressure: FC = () => {
    useShowBackButton();
    const userBloodPressureQuery = useQuery(
        ['UserBloodPressure'],
        getAllUserBloodPressure
    );

    if (userBloodPressureQuery.isLoading) return <Loading />;

    const weights = userBloodPressureQuery.data?.data.sort((a, b) =>
        a.created < b.created ? 1 : -1
    );

    return (
        <div className="max-w-2xl w-full grid grid-cols-1">
            <h2 className="text-2xl text-secondary">
                All Blood Pressure Records
            </h2>
            {weights?.map((item) => (
                <AllBloodPressureCard
                    id={item.id}
                    date={item.created}
                    defaultSystolic={item.systolic}
                    defaultDiastolic={item.diastolic}
                />
            ))}
        </div>
    );
};
