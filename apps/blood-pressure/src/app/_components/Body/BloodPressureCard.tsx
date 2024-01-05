'use client';

import { format } from 'date-fns';
import { FC, useState } from 'react';
import { Dialog } from '~/app/_components/Body/Dialog';
import { BloodPressureForm } from '~/app/_components/Body/BloodPressureForm';

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
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <button
                className="card hover:bg-primary-dark active:bg-background my-2 cursor-pointer p-4 text-left"
                onClick={handleClick}
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
            <Dialog open={open} setOpen={setOpen}>
                <BloodPressureForm
                    id={id}
                    date={date}
                    systolic={systolic}
                    diastolic={diastolic}
                    heartRate={heartRate}
                    setOpen={setOpen}
                />
            </Dialog>
        </>
    );
};
