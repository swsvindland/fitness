'use client';

import { format } from 'date-fns';
import { FC } from 'react';
import { HeightForm } from '~/app/_components/Height/HeightForm';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';

interface IProps {
    id: number;
    date: string;
    height: number;
}

export const HeightCard: FC<IProps> = ({ id, date, height }) => {
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
                        <dt className="text-secondary text-lg">Height</dt>
                        <dd>{height}</dd>
                    </div>
                </dl>
            </button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Enter Blood Pressure Reading
                            </ModalHeader>
                            <ModalBody>
                                <HeightForm
                                    id={id}
                                    date={date}
                                    height={height}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
