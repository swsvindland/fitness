'use client';

import { FC } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { BodyForm } from './BodyForm';

export const CreateBody: FC = () => {
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
                                Enter Weight
                            </ModalHeader>
                            <ModalBody>
                                <BodyForm
                                    id={null}
                                    date={new Date().toISOString()}
                                    body={null}
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
