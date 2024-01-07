'use client';

import { format } from 'date-fns';
import { FC } from 'react';
import { BloodPressureForm } from '~/app/_components/Body/BloodPressureForm';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    ModalBody,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { Modal, ModalContent } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { api } from '~/trpc/react';

interface IProps {
    id: number;
    date: string;
    systolic: number;
    diastolic: number;
    heartRate: number | null;
}

export const BloodPressureCard: FC<IProps> = ({
    id,
    date,
    systolic,
    diastolic,
    heartRate,
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const utils = api.useUtils();

    const deleteMutation = api.body.deleteBloodPressure.useMutation({
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
                            <dt className="text-secondary text-lg">Systolic</dt>
                            <dd>{systolic}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">
                                Diastolic
                            </dt>
                            <dd>{diastolic}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">
                                Heart Rate
                            </dt>
                            <dd>{heartRate ?? 'N/A'}</dd>
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
                                Update Blood Pressure Reading
                            </ModalHeader>
                            <ModalBody>
                                <BloodPressureForm
                                    id={id}
                                    date={date}
                                    systolic={systolic}
                                    diastolic={diastolic}
                                    heartRate={heartRate}
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
