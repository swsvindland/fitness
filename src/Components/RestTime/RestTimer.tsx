import { type FC, useContext, useEffect, useState } from 'react';
import { XSolid } from '../Icons/XSolid';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { SnackbarContext } from '../Snackbars/SnackbarProvider';

interface IProps {
    timer?: number;
}

export const RestTimer: FC<IProps> = ({ timer }) => {
    const { setOpenRestTimer } = useContext(SnackbarContext);
    const [time, setTime] = useState<number | undefined>(timer);

    useEffect(() => {
        if (!time) return;
        if (time < 2) {
            setTime(undefined);
            setOpenRestTimer(undefined);
            return;
        }
        setTimeout(() => {
            setTime(time - 1);
        }, 1000);
    }, [time, setOpenRestTimer]);

    if (!time) return null;

    const handleClose = () => {
        setTime(undefined);
        setOpenRestTimer(undefined);
    };

    const percentage = ((time ?? 0) / (timer ?? 1)) * 100;

    return (
        <div
            id="rest-timer"
            className="sticky top-20 z-20 mx-2 h-0 w-full"
            role="alert"
        >
            <div className="text-secondary flex w-full items-center rounded-lg bg-white p-4 shadow-2xl dark:bg-teal-800">
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="ml-3 mr-8 w-full text-sm font-normal">
                        <div className="relative w-full">
                            <span>Rest Timer</span>
                            <div className="bg-secondary-light my-2 flex h-2 overflow-hidden rounded text-xs shadow-inner">
                                <div
                                    style={{
                                        width: `${percentage}%`,
                                    }}
                                    className={`flex flex-col justify-center whitespace-nowrap text-center text-white shadow-inner ${
                                        percentage < 10
                                            ? 'bg-amber-500'
                                            : 'bg-teal-500'
                                    }`}
                                ></div>
                            </div>
                            <span>{time} seconds left</span>
                        </div>
                    </div>
                    <SecondaryButton
                        className="my-auto h-8 p-2"
                        onClick={handleClose}
                    >
                        <XSolid className="h-4 w-4 fill-teal-400" />
                    </SecondaryButton>
                </div>
            </div>
        </div>
    );
};
