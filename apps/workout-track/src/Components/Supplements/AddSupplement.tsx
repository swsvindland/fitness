import { FC, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { SupplementTimes } from './SupplementTimes';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { Button } from '../Buttons/Button';
import { Time } from './SupplementCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserSupplement } from '@fitness/types';
import { updateUserSupplement } from '@fitness/api-legacy';

interface IProps {
    userSupplementId?: number;
    supplementId: number;
    userId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    defaultTimes: string[];
}

export const AddSupplement: FC<IProps> = ({
    open,
    setOpen,
    userSupplementId,
    supplementId,
    userId,
    defaultTimes,
}) => {
    const queryClient = useQueryClient();
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

    const mutation = useMutation(updateUserSupplement, {
        onSuccess: () => {
            queryClient.invalidateQueries(['UserSupplements']);
        },
    });

    const handleSubmit = () => {
        const userSupplement: UserSupplement = {
            userId,
            supplementId,
            id: userSupplementId,
            times: enabledTimes
                .filter((time) => time.enabled)
                .map((time) => time.name),
        };

        mutation.mutate(userSupplement);
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            className="relative z-50"
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="card mx-auto w-full max-w-sm p-4">
                    <Dialog.Title className="text-secondary">
                        Add Supplement
                    </Dialog.Title>
                    <Dialog.Description className="text-ternary">
                        Select when you want to take this
                    </Dialog.Description>

                    <SupplementTimes
                        times={enabledTimes}
                        setTimes={setEnabledTimes}
                    />

                    <div className="flex justify-between align-middle">
                        <SecondaryButton onClick={() => setOpen(false)}>
                            Cancel
                        </SecondaryButton>
                        <Button onClick={() => handleSubmit()}>
                            Set Times
                        </Button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};
