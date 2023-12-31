'use client';

import { format } from 'date-fns';
import { FC, useState } from 'react';
import { Dialog } from '~/app/_components/Body/Dialog';
import { HeightForm } from '~/app/_components/Height/HeightForm';

interface IProps {
    id: number;
    date: string;
    height: number;
}

export const HeightCard: FC<IProps> = ({ id, date, height }) => {
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
                        <dt className="text-secondary text-lg">Height</dt>
                        <dd>{height}</dd>
                    </div>
                </dl>
            </button>
            <Dialog open={open} setOpen={setOpen}>
                <HeightForm id={id} date={date} height={height} />
            </Dialog>
        </>
    );
};
