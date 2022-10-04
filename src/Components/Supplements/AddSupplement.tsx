import { FC, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { SupplementTimes } from './SupplementTimes';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { Button } from '../Buttons/Button';
import { Time } from './SupplementCard';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserSupplement } from '../../types/userSupplement';
import { API_URL } from '../../api';

interface IProps {
    userSupplementId?: number;
    supplementId: number;
    userId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const AddSupplement: FC<IProps> = ({
    open,
    setOpen,
    userSupplementId,
    supplementId,
    userId,
}) => {
    const queryClient = useQueryClient();
    const [enabledTimes, setEnabledTimes] = useState<Time[]>([
        {
            name: 'Morning',
            enabled: false,
        },
        {
            name: 'Breakfast',
            enabled: false,
        },
        {
            name: 'Lunch',
            enabled: false,
        },
        {
            name: 'PreWorkout',
            enabled: false,
        },
        {
            name: 'PostWorkout',
            enabled: false,
        },
        {
            name: 'Dinner',
            enabled: false,
        },
        {
            name: 'Evening',
            enabled: false,
        },
    ]);

    const updateUserSupplement = (userSupplement: UserSupplement) => {
        return axios.post(
            `${API_URL}/api/UpdateUserSupplements`,
            userSupplement
        );
    };

    const mutation = useMutation(updateUserSupplement, {
        onSuccess: (data, variables, context) => {
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
                <Dialog.Panel className="mx-auto max-w-sm w-full rounded bg-card p-4">
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
                        <Button onClick={() => handleSubmit()}>Add</Button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};
