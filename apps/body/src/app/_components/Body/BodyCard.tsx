'use client';

import { format } from 'date-fns';
import { FC } from 'react';
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
import { BodyForm, IBody } from './BodyForm';

interface IProps {
    id: number;
    date: string;
    body: IBody;
}

export const BodyCard: FC<IProps> = ({ id, date, body }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const utils = api.useUtils();

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
                            <dt className="text-secondary text-lg">Body</dt>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Neck</dt>
                            <dd>{body.neck}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">
                                Shoulders
                            </dt>
                            <dd>{body.shoulders}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Chest</dt>
                            <dd>{body.chest}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Biceps</dt>
                            <dd>
                                {body.leftBicep} / {body.rightBicep}
                            </dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Waist</dt>
                            <dd>{body.waist}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Navel</dt>
                            <dd>{body.navel}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Hips</dt>
                            <dd>{body.hip}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Thigh</dt>
                            <dd>
                                {body.leftThigh} / {body.rightThigh}
                            </dd>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <dt className="text-secondary text-lg">Calf</dt>
                            <dd>
                                {body.leftCalf} / {body.rightCalf}
                            </dd>
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
                                <BodyForm
                                    id={id}
                                    date={date}
                                    body={body}
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
