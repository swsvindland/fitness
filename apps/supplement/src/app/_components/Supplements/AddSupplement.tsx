import { FC, useState } from 'react';
import { SupplementTimes } from './SupplementTimes';
import { Time } from './SupplementCard';
import { api } from '~/trpc/react';
import { Button } from '@nextui-org/button';

interface IProps {
    userSupplementId?: number;
    supplementId: number;
    defaultTimes: string[];
    onClose: () => void;
}

export const AddSupplement: FC<IProps> = ({
    userSupplementId,
    supplementId,
    defaultTimes,
    onClose,
}) => {
    const utils = api.useUtils();

    const [enabledTimes, setEnabledTimes] = useState<Time[]>([
        {
            name: 'Morning',
            enabled: defaultTimes.includes('Morning'),
        },
        {
            name: 'Breakfast',
            enabled: defaultTimes.includes('Breakfast'),
        },
        {
            name: 'Lunch',
            enabled: defaultTimes.includes('Lunch'),
        },
        {
            name: 'PreWorkout',
            enabled: defaultTimes.includes('PreWorkout'),
        },
        {
            name: 'PostWorkout',
            enabled: defaultTimes.includes('PostWorkout'),
        },
        {
            name: 'Dinner',
            enabled: defaultTimes.includes('Dinner'),
        },
        {
            name: 'Evening',
            enabled: defaultTimes.includes('Evening'),
        },
    ]);

    const mutation = api.supplements.upsertUserSupplement.useMutation({
        onSuccess: async () => {
            await utils.supplements.getUserSupplements.invalidate();
        },
    });

    const handleSubmit = () => {
        const userSupplement = {
            supplementId,
            id: userSupplementId ?? -1,
            times: enabledTimes
                .filter((time) => time.enabled)
                .map((time) => time.name),
        };

        mutation.mutate(userSupplement);
        onClose();
    };

    return (
        <div>
            <SupplementTimes times={enabledTimes} setTimes={setEnabledTimes} />

            <div className="mb-4 flex justify-between align-middle">
                <Button color="warning" onClick={() => onClose()}>
                    Cancel
                </Button>
                <Button color="primary" onClick={() => handleSubmit()}>
                    Set Times
                </Button>
            </div>
        </div>
    );
};
