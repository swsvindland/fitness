import { useContext, useEffect } from 'react';
import { HeaderContext } from './HeaderContext';

export const useHideBackButton = () => {
    const { setGoBack } = useContext(HeaderContext);

    useEffect(() => {
        setGoBack(false);
    }, [setGoBack]);
};

export const useShowBackButton = () => {
    const { setGoBack } = useContext(HeaderContext);

    useEffect(() => {
        setGoBack(true);
    }, [setGoBack]);
};
