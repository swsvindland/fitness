import { FC, useEffect, useState } from 'react';
import { PersonSolid } from '../Icons/PersonSolid';
import { UtensilsSolid } from '../Icons/UtensilsSolid';
import { DumbbellSolid } from '../Icons/DumbbellSolid';
import { CapsulesSolid } from '../Icons/CapsulesSolid';
import { HomeSolid } from '../Icons/HomeSolid';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const BottomNavigation: FC = () => {
    const history = useHistory();
    const [pathname, setPathname] = useState<string>(history.location.pathname);

    useEffect(() => {
        history.listen((location) => {
            setPathname(location.pathname);
        });
    }, [history]);

    const isSelected = (route: string) => {
        return pathname.includes(route);
    };

    const linkStyle = (route: string) =>
        `${
            isSelected(route) ? 'text-ternary' : 'text-secondary'
        } w-full justify-center inline-block text-center pt-2 pb-1`;

    const iconStyle = (route: string) =>
        `${
            isSelected(route) ? 'fill-ternary' : 'fill-secondary'
        } tab tab-home block text-xs w-6 h-6 m-auto`;

    return (
        <div
            id="bottom-navigation"
            className="block fixed inset-x-0 bottom-0 z-10 bg-primary-dark dark:bg-background shadow pb-6"
        >
            <div id="tabs" className="flex justify-between">
                <Link to="/home" className={linkStyle('/home')}>
                    <HomeSolid className={iconStyle('/home')} />
                    <span className="tab tab-home block text-xs">Home</span>
                </Link>
                <Link to="/workout" className={linkStyle('/workout')}>
                    <DumbbellSolid className={iconStyle('/workout')} />
                    <span className="tab tab-home block text-xs">Workout</span>
                </Link>
                <Link to="/eat" className={linkStyle('/eat')}>
                    <UtensilsSolid className={iconStyle('/eat')} />
                    <span className="tab tab-home block text-xs">Eat</span>
                </Link>
                <Link to="/supplements" className={linkStyle('/supplements')}>
                    <CapsulesSolid className={iconStyle('/supplements')} />
                    <span className="tab tab-home block text-xs">
                        Supplements
                    </span>
                </Link>
                <Link to="/body" className={linkStyle('/body')}>
                    <PersonSolid className={iconStyle('/body')} />
                    <span className="tab tab-home block text-xs">Body</span>
                </Link>
            </div>
        </div>
    );
};
