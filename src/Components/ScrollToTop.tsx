import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const ScrollToTop: FC = () => {
    const history = useHistory();

    useEffect(() => {
        history.listen(() => {
            window.scrollTo(0, 0);
        });
    }, [history]);

    return null;
};
