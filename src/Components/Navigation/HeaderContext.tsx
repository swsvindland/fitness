import { createContext, type FC, type ReactNode, useState } from 'react';

interface IHeaderContext {
    goBack: boolean;
    setGoBack: (goBack: boolean) => void;
}

export const HeaderContext = createContext<IHeaderContext>(
    {} as IHeaderContext
);

interface IProps {
    children: ReactNode;
}

export const HeaderProvider: FC<IProps> = ({ children }) => {
    const [goBack, setGoBack] = useState<boolean>(false);

    const headerContext: IHeaderContext = {
        goBack,
        setGoBack,
    };

    return (
        <HeaderContext.Provider value={headerContext}>
            {children}
        </HeaderContext.Provider>
    );
};
