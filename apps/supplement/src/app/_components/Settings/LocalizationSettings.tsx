'use client';

import { FC } from 'react';
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
import { Button } from '@nextui-org/button';
import { Modal, ModalContent } from '@nextui-org/modal';
import { UnitsForm } from '~/app/_components/Settings/UnitsForm';
import { api } from '~/trpc/react';

export const LocalizationSettings: FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const settings = api.settings.getUserSettings.useQuery();

    return (
        <>
            <Card>
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <h2 className="text-md">Localization Settings</h2>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <dl className="text-ternary">
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Units</dt>
                            <dd>{settings.data?.Units}</dd>
                        </div>
                    </dl>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button variant="light" color="primary" onPress={onOpen}>
                        Update
                    </Button>
                </CardFooter>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Update Units
                            </ModalHeader>
                            <ModalBody>
                                <UnitsForm onClose={onClose} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
