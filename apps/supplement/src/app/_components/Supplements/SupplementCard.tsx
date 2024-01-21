'use client';

import { FC, useEffect, useState } from 'react';
import { AddSupplement } from './AddSupplement';
import { SupplementIcon } from '@fitness/types';
import {
    Capsule,
    CircleCheckSolid,
    Injection,
    LargeScoop,
    Liquid,
    SmallScoop,
    Tablet,
} from '@fitness/ui';
import { api } from '~/trpc/react';
import {
    Card,
    CardFooter,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Spinner,
    useDisclosure,
} from '@nextui-org/react';

interface IProps {
    isUser: boolean;
    name: string;
    times?: string[];
    supplementId: number;
    userSupplementId?: number;
    icon?: string;
}

export interface Time {
    name: string;
    enabled: boolean;
}

const Icon: FC<{ icon?: string }> = ({ icon }) => {
    switch (icon) {
        case SupplementIcon.Capsule:
            return <Capsule className="fill-primary-900 w-6" />;
        case SupplementIcon.Tablet:
            return <Tablet className="fill-primary-900 w-6" />;
        case SupplementIcon.Injection:
            return <Injection className="fill-primary-900 w-6" />;
        case SupplementIcon.LargeScoop:
            return <LargeScoop className="fill-primary-900 w-6" />;
        case SupplementIcon.SmallScoop:
            return <SmallScoop className="fill-primary-900 w-6" />;
        case SupplementIcon.Liquid:
            return <Liquid className="fill-primary-900 w-6" />;
        default:
            return <div className="h-12 w-6" />;
    }
};

export const SupplementCard: FC<IProps> = ({
    isUser,
    name,
    times,
    supplementId,
    userSupplementId,
    icon,
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [checked, setChecked] = useState<boolean>(false);
    const today = new Date();
    const utils = api.useUtils();

    const mutation = api.supplements.toggleUserSupplementActivity.useMutation({
        onSuccess: async () => {
            await utils.supplements.getUserSupplementActivity.invalidate();
        },
    });

    const userSupplementActivityQuery =
        api.supplements.getUserSupplementActivity.useQuery(
            {
                date: today.toDateString(),
                supplementId: supplementId,
                userSupplementId: userSupplementId ?? null,
                time: times ? times?.at(0) ?? null : null,
            },
            {
                enabled:
                    isUser &&
                    !!times?.length &&
                    !!supplementId &&
                    !!userSupplementId,
            }
        );

    useEffect(() => {
        if (userSupplementActivityQuery?.data) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [userSupplementActivityQuery?.data]);

    const handleCheck = () => {
        if (!times || !times[0]) return;
        if (!userSupplementId) return;
        if (mutation.isLoading) return;

        mutation.mutate({
            date: today.toISOString(),
            userSupplementId: userSupplementId,
            time: times[0],
        });
    };

    return (
        <>
            <Card
                isPressable
                onPress={() => (isUser ? handleCheck() : onOpen())}
            >
                <div className="flex w-full items-center justify-between p-4">
                    <div className="flex gap-5">
                        <div className="bg-secondary rounded-full px-3.5">
                            <Icon icon={icon} />
                        </div>
                        <div className="flex flex-col items-start justify-center gap-1">
                            <h4>{name}</h4>
                        </div>
                    </div>
                    {isUser &&
                        checked &&
                        !mutation.isLoading &&
                        !userSupplementActivityQuery.isFetching && (
                            <CircleCheckSolid className="fill-secondary h-8 w-8" />
                        )}
                    {isUser &&
                        (mutation.isLoading ||
                            userSupplementActivityQuery.isFetching) && (
                            <Spinner />
                        )}
                </div>
                {!isUser && times && (
                    <CardFooter>
                        {times.map((time, index) => (
                            <span className="text-xs" key={time}>
                                {time}
                                {index !== times.length - 1 && ' | '}
                            </span>
                        ))}
                    </CardFooter>
                )}
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add Supplement
                            </ModalHeader>
                            <ModalBody>
                                <AddSupplement
                                    supplementId={supplementId}
                                    userSupplementId={userSupplementId}
                                    defaultTimes={times ?? []}
                                    onClose={onClose}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
