import { FC } from 'react';
import { BloodPressureCard } from './BloodPressureCard';
import { api } from '~/trpc/server';

export const AllBloodPressure: FC = async () => {
    const userBloodPressureQuery = await api.body.getAllBloodPressures.query();

    return (
        <div className="container grid grid-cols-1">
            <div className=" grid grid-cols-1 gap-2">
                {userBloodPressureQuery?.map((item) => (
                    <BloodPressureCard
                        id={Number(item.Id)}
                        date={item.Created.toDateString()}
                        systolic={item.Systolic}
                        diastolic={item.Diastolic}
                        heartRate={item.HeartRate}
                    />
                ))}
            </div>
        </div>
    );
};
