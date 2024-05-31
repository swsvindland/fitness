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
import { api } from '~/trpc/react';
import { CustomMacroForm } from '~/app/_components/Settings/CustomMacroForm';

export const CustomMacroSettings: FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const macros = api.macros.getMacros.useQuery();

    return (
        <>
            <Card>
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <h2 className="text-md">Custom Macros Settings</h2>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <dl className="text-ternary">
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Calories</dt>
                            <dd>{macros.data?.Calories}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Protien</dt>
                            <dd>{macros.data?.Protein}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Fat</dt>
                            <dd>{macros.data?.Fat}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Carbs</dt>
                            <dd>{macros.data?.Carbs}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Fiber</dt>
                            <dd>{macros.data?.Fiber}</dd>
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
                                Update Macros
                            </ModalHeader>
                            <ModalBody>
                                <CustomMacroForm onClose={onClose} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
