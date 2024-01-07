'use client';

import { FC } from 'react';
import { BloodPressureForm } from '~/app/_components/Body/BloodPressureForm';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Modal, ModalContent } from '@nextui-org/modal';
import { ModalBody, ModalHeader, useDisclosure } from '@nextui-org/react';

export const Create: FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className="fixed bottom-20 right-4 z-50 md:bottom-4">
                <Button
                    color="primary"
                    onPress={onOpen}
                    startContent={
                        <PlusIcon className="text-secondary mr-2 w-4" />
                    }
                >
                    Create
                </Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Enter Blood Pressure Reading
                            </ModalHeader>
                            <ModalBody>
                                <BloodPressureForm
                                    id={null}
                                    date={new Date().toISOString()}
                                    systolic={null}
                                    diastolic={null}
                                    heartRate={null}
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
