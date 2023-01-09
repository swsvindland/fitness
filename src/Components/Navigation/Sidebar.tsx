import { FC, useEffect, useState } from 'react';
import { PersonSolid } from '../Icons/PersonSolid';
import { Capsule } from '../Icons/Capsule';
import { Dumbbell } from '../Icons/Dumbbell';
import { Food } from '../Icons/Food';
import { Home } from '../Icons/Home';
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
        <div className="z-20 flex-1 flex flex-col min-h-0 border-gray-200 bg-primary-dark dark:bg-background shadow pl-safe ">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 bg-transparent space-y-1 mt-16">
                    <Link to="/" className={linkStyle(['/'])}>
                        <Home className={iconStyle(['/'])} />
                        Home
                    </Link>
                    <Link
                        to="/workout"
                        className={linkStyle(['/workout', '/cardio'])}
                    >
                        <Dumbbell
                            className={iconStyle(['/workout', '/cardio'])}
                        />
                        Workout
                    </Link>

                    <Link to="/eat" className={linkStyle(['/eat'])}>
                        <Food className={iconStyle(['/eat'])} />
                        Eat
                    </Link>

                    <Link
                        to="/supplements"
                        className={linkStyle(['/supplements'])}
                    >
                        <Capsule className={iconStyle(['/supplements'])} />
                        Supplements
                    </Link>

                    <Link to="/body" className={linkStyle(['/body'])}>
                        <PersonSolid className={iconStyle(['/body'])} />
                        Body
                    </Link>
                </nav>
            </div>
        </div>
    );
};
