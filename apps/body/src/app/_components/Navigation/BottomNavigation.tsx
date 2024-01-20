'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isSelected } from '~/app/_components/Navigation/utils';
import {
    ArrowsRightLeftIcon,
    ArrowUpCircleIcon,
    Cog6ToothIcon,
    HomeIcon,
    ScaleIcon,
} from '@heroicons/react/24/outline';
import { Card } from '@nextui-org/react';

export const BottomNavigation: FC = () => {
    const pathname = usePathname();

    const linkStyle = (route: string[]) =>
        `${
            isSelected(pathname, route)
                ? 'text-ternary bg-primary-dark'
                : 'text-secondary'
        } w-full justify-center inline-block text-center py-3 rounded hover:bg-primary-dark active:bg-primary-dark`;

    const iconStyle = (route: string[]) =>
        `${
            isSelected(pathname, route) ? 'text-ternary' : 'text-secondary'
        } tab tab-home block text-xs w-6 h-6 m-auto`;

    return (
        <Card
            id="bottom-navigation"
            className="pb-safe fixed inset-x-0 bottom-0 z-50 block rounded-none"
        >
            <div id="tabs" className="flex justify-between">
                <Link href="/" className={linkStyle(['/'])}>
                    <HomeIcon className={iconStyle(['/'])} />
                    <span className="tab tab-home block text-xs">Home</span>
                </Link>
                <Link href="/weights" className={linkStyle(['/weights'])}>
                    <ScaleIcon className={iconStyle(['/weights'])} />
                    <span className="tab tab-home block text-xs">Weights</span>
                </Link>
                <Link href="/heights" className={linkStyle(['/heights'])}>
                    <ArrowUpCircleIcon className={iconStyle(['/heights'])} />
                    <span className="tab tab-home block text-xs">Heights</span>
                </Link>
                <Link href="/bodies" className={linkStyle(['/bodies'])}>
                    <ArrowsRightLeftIcon className={iconStyle(['/bodies'])} />
                    <span className="tab tab-home block text-xs">Bodies</span>
                </Link>
                <Link href="/settings" className={linkStyle(['/settings'])}>
                    <Cog6ToothIcon className={iconStyle(['/settings'])} />
                    <span className="tab tab-home block text-xs">Settings</span>
                </Link>
            </div>
        </Card>
    );
};
