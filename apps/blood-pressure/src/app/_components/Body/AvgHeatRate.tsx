import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { FC } from 'react';
import { api } from '~/trpc/server';

export const AvgHeatRate: FC = async () => {
    const avgHeartRate = await api.body.getAvgHeartRate.query();

    return (
        <Card className="py-4">
            <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
                <p className="text-tiny font-bold uppercase">Heart Rate</p>
                <small className="text-default-500">30 day average</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <h4 className="text-large font-bold">
                    {avgHeartRate?.heartRate} bpm
                </h4>
            </CardBody>
        </Card>
    );
};
