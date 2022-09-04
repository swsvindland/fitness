import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BedSolid } from '../../icons/BedSolid';
import { CapsulesSolid } from '../../icons/CapsulesSolid';
import { DumbbellSolid } from '../../icons/DumbbellSolid';
import { UtensilsSolid } from '../../icons/UtensilsSolid';
import { HomeSolid } from '../../icons/HomeSolid';

export const Sidebar: FC = () => {
    const location = useLocation();

    const isSelected = (route: string) => {
        return location.pathname.includes(route);
    };

    const linkStyle = (route: string) =>
        `${
            isSelected(route) ? 'text-ternary' : 'text-secondary'
        } hover:bg-primary-light hover:text-secondary group flex items-center px-2 py-2 text-sm font-medium rounded-md`;

    const iconStyle = (route: string) =>
        `${isSelected(route) ? 'fill-ternary' : 'fill-secondary'} mr-2 h-6 w-6`;

    return (
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-primary-dark">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                        alt="Workflow"
                    />
                </div>
                <nav className="mt-5 flex-1 px-2 bg-transparent space-y-1">
                    <Link to="/home" className={linkStyle('/home')}>
                        <HomeSolid className={iconStyle('/home')} />
                        Home
                    </Link>
                    <Link to="/workout" className={linkStyle('/workout')}>
                        <DumbbellSolid className={iconStyle('/workout')} />
                        Workout
                    </Link>

                    <Link to="/eat" className={linkStyle('/eat')}>
                        <UtensilsSolid className={iconStyle('/eat')} />
                        Eat
                    </Link>

                    <Link
                        to="/supplements"
                        className={linkStyle('/supplements')}
                    >
                        <CapsulesSolid className={iconStyle('/supplements')} />
                        Supplements
                    </Link>

                    <Link to="/body" className={linkStyle('/body')}>
                        <BedSolid className={iconStyle('/body')} />
                        Body
                    </Link>
                </nav>
            </div>
        </div>
    );
};
