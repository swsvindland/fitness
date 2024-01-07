'use client';

import { format } from 'date-fns';
import { FC } from 'react';
import { BloodPressureForm } from '~/app/_components/Body/BloodPressureForm';
import { ModalBody, ModalHeader, useDisclosure } from '@nextui-org/react';
import { Modal, ModalContent } from '@nextui-org/modal';

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

    return (
        <>
            <button
                className="card hover:bg-primary-dark active:bg-background my-2 cursor-pointer p-4 text-left"
                onClick={onOpen}
            >
                <span className="text-secondary text-lg">
                    {format(new Date(date ?? ''), 'PP')}
                </span>
                <hr className="border-secondary" />
                <dl className="text-ternary">
                    <div className="grid grid-cols-2 gap-2">
                        <dt className="text-secondary text-lg">Systolic</dt>
                        <dd>{systolic}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <dt className="text-secondary text-lg">Diastolic</dt>
                        <dd>{diastolic}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <dt className="text-secondary text-lg">Heart Rate</dt>
                        <dd>{heartRate ?? 'N/A'}</dd>
                    </div>
                </dl>
            </button>
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
