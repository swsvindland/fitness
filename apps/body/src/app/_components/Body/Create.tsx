'use client';

import { FC, useState } from 'react';
import { Button } from '~/app/_components/Buttons/Button';
import { Dialog } from '~/app/_components/Body/Dialog';
import { BloodPressureForm } from '~/app/_components/Body/BloodPressureForm';
import { PlusIcon } from '@heroicons/react/24/outline';

export const Create: FC = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <div className="fixed bottom-20 right-4 z-50 md:bottom-4">
                <Button onClick={handleClick}>
                    <PlusIcon className="text-secondary mr-2 w-4" />
                    Create
                </Button>
            </div>
            <Dialog open={open} setOpen={setOpen}>
                <BloodPressureForm
                    id={null}
                    date={new Date().toISOString()}
                    systolic={null}
                    diastolic={null}
                    heartRate={null}
                />
            </Dialog>
        </>
    );
};
