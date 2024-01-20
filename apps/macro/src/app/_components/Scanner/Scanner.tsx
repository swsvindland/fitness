'use client';

import { FC, useEffect, useState } from 'react';
import { BarcodeScannerComponent } from './BarcodeScannerComponent';
import { useRouter } from 'next/navigation';
import { XSolid } from '@fitness/ui';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    useDisclosure,
} from '@nextui-org/react';

export const Scanner: FC = () => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [data, setData] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (data && data.length > 6) {
            console.log('data', data);

            onClose();
            router.push(`/scan-food/${data}`);
        }
    }, [data, router, onClose]);

    return (
        <>
            <Button variant="bordered" color="primary" onClick={onOpen}>
                Scan Barcode
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>
                        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                            <button
                                type="button"
                                className="focus:ring-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                                onClick={() => onClose()}
                            >
                                <span className="sr-only">Close</span>
                                <XSolid
                                    className="fill-ternary h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <div className="mt-2">
                                    <BarcodeScannerComponent
                                        width={500}
                                        height={500}
                                        facingMode={'environment'}
                                        onUpdate={(err, result) => {
                                            // @ts-ignore
                                            if (result) setData(result.text);
                                            else setData('');
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
