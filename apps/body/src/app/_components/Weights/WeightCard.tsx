'use client';

import { format } from 'date-fns';
import { FC, useState } from 'react';
import { Dialog } from '~/app/_components/Body/Dialog';
import { WeightForm } from '~/app/_components/Weights/WeightForm';
import { useDisclosure } from '@nextui-org/react';

interface IProps {
    id: number;
    date: string;
    weight: number;
}

export const WeightCard: FC<IProps> = ({ id, date, weight }) => {
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
                        <dt className="text-secondary text-lg">Weight</dt>
                        <dd>{weight}</dd>
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
                                <WeightForm
                                    id={id}
                                    date={date}
                                    weight={weight}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>{' '}
        </>
    );
};
