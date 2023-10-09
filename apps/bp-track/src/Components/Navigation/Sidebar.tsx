import { FC, useEffect, useState } from 'react';
import { PersonSolid } from '../Icons/PersonSolid';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { isSelected } from './utils';

export const Sidebar: FC = () => {
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
        } hover:bg-primary-light hover:text-secondary group flex items-center px-2 py-2 text-sm font-medium rounded-md`;

    const iconStyle = (route: string[]) =>
        `${
            isSelected(pathname, route) ? 'fill-ternary' : 'fill-secondary'
        } mr-2 h-6 w-6`;

    return (
        <div className="z-20 flex min-h-0 flex-1 flex-col border-gray-200 bg-primary-dark shadow pl-safe dark:bg-background ">
            <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
                <nav className="mt-16 flex-1 space-y-1 bg-transparent px-2">
                    <Link to="/body" className={linkStyle(['/body'])}>
                        <PersonSolid className={iconStyle(['/body'])} />
                        Body
                    </Link>
                </nav>
            </div>
        </div>
    );
};
