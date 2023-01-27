import { FC } from 'react';
import { classNames } from '../../utils/classNames';
import { Link } from 'react-router-dom';

export const WorkoutTabs: FC = () => {
    const tabs = [
        {
            name: 'Resistance',
            href: '/workout',
            current: window.location.pathname === '/workout',
        },
        {
            name: 'Cardio',
            href: '/cardio',
            current: window.location.pathname === '/cardio',
        },
    ];

    return (
        <div className="mb-4 w-full max-w-2xl">
            <div className="block">
                <div className="border-b border-ternary">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={classNames(
                                    tab.current
                                        ? 'border-secondary text-secondary'
                                        : 'border-transparent text-ternary',
                                    'w-1/2 border-b-2 py-4 px-1 text-center text-sm font-medium'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};
