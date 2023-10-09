import { FC, useEffect, useState } from 'react';
import { PersonSolid } from '../Icons/PersonSolid';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { isSelected } from './utils';

export const BottomNavigation: FC = () => {
    const history = useHistory();
    const [pathname, setPathname] = useState<string>(history.location.pathname);

    useEffect(() => {
        history.listen((location) => {
            setPathname(location.pathname);
        });
    }, [history]);

    const linkStyle = (route: string[]) =>
        `${
            isSelected(pathname, route) ? 'text-ternary' : 'text-secondary'
        } w-full justify-center inline-block text-center pt-2 pb-1`;

    const iconStyle = (route: string[]) =>
        `${
            isSelected(pathname, route) ? 'fill-ternary' : 'fill-secondary'
        } tab tab-home block text-xs w-6 h-6 m-auto`;

    return (
        <div
            id="bottom-navigation"
            className="fixed inset-x-0 bottom-0 z-10 block bg-primary-dark pb-6 shadow dark:bg-background"
        >
            <div id="tabs" className="flex justify-between">
                <Link to="/body" className={linkStyle(['/body'])}>
                    <PersonSolid className={iconStyle(['/body'])} />
                    <span className="tab tab-home block text-xs">Body</span>
                </Link>
            </div>
        </div>
    );
};
