import { createContext, type FC, type ReactNode, useState } from 'react';
import { RestTimer } from '../RestTime/RestTimer';

export interface IRestTimer {
    id: string;
    time?: number;
}

interface ISnackbarContext {
    openRestTimer?: IRestTimer;
    setOpenRestTimer: (timer?: IRestTimer) => void;
}

export const SnackbarContext = createContext<ISnackbarContext>(
    {} as ISnackbarContext
);

interface IProps {
    children: ReactNode;
}

export const SnackbarProvider: FC<IProps> = ({ children }) => {
    const [openRestTimer, setOpenRestTimer] = useState<IRestTimer | undefined>(
        undefined
    );

    const snackbarContext: ISnackbarContext = {
        openRestTimer,
        setOpenRestTimer,
    };

    return (
        <SnackbarContext.Provider value={snackbarContext}>
            <RestTimer key={openRestTimer?.id} timer={openRestTimer?.time} />
            {children}
        </SnackbarContext.Provider>
    );
};
