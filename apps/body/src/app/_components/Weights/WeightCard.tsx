'use client';

import { format } from 'date-fns';
import React, { FC } from 'react';
import { WeightForm } from '~/app/_components/Weights/WeightForm';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { api } from '~/trpc/react';

interface IProps {
    id: number;
    date: string;
    weight: number;
}

export const WeightCard: FC<IProps> = ({ id, date, weight }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const deleteMutation = api.body.deleteWeight.useMutation({
        onSuccess: async () => {
            await utils.body.invalidate();
            await utils.dashboard.invalidate();
        },
    });

    return (
        <>
            <Card>
                <CardHeader className="text-secondary text-lg">
                    {format(new Date(date ?? ''), 'PP')}
                </CardHeader>
                <Divider />
                <CardBody>
                    <dl className="text-ternary">
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Weight</dt>
                            <dd>{weight}</dd>
                        </div>
                    </dl>
                </CardBody>
                <Divider />
                <CardFooter className="flex gap-2">
                    <Button variant="light" color="primary" onPress={onOpen}>
                        Update
                    </Button>
                    <Button
                        variant="light"
                        color="danger"
                        onPress={() => deleteMutation.mutate({ id })}
                    >
                        Delete
                    </Button>
                </CardFooter>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Enter Blood Pressure Reading
                            </ModalHeader>
                            <ModalBody>
                                <WeightForm
                                    id={id}
                                    date={date}
                                    weight={weight}
                                    setOpen={onClose}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
