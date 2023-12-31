'use client';

import { format } from 'date-fns';
import { FC, useState } from 'react';
import { Dialog } from '~/app/_components/Body/Dialog';
import { WeightForm } from '~/app/_components/Weights/WeightForm';

interface IProps {
    id: number;
    date: string;
    weight: number;
}

export const WeightCard: FC<IProps> = ({ id, date, weight }) => {
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
                        <dt className="text-secondary text-lg">Weight</dt>
                        <dd>{weight}</dd>
                    </div>
                </dl>
            </button>
            <Dialog open={open} setOpen={setOpen}>
                <WeightForm id={id} date={date} weight={weight} />
            </Dialog>
        </>
    );
};
