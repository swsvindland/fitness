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
        <div className="max-w-2xl w-full mb-4">
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
                                    'w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm'
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
