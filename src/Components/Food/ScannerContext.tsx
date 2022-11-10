import { createContext, FC, ReactNode, useState } from 'react';

interface IScannerContext {
    hideBackground: boolean;
    setHideBackground: (hideBackground: boolean) => void;
}

export const ScannerContext = createContext<IScannerContext>(
    {} as IScannerContext
);

interface IProps {
    children: ReactNode;
}

export const ScannerProvider: FC<IProps> = ({ children }) => {
    const [hideBackground, setHideBackground] = useState<boolean>(false);

    const scannerContext: IScannerContext = {
        hideBackground,
        setHideBackground,
    };

    return (
        <ScannerContext.Provider value={scannerContext}>
            {children}
        </ScannerContext.Provider>
    );
};
