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

export const Sidebar: FC = () => {
    const pathname = usePathname();

    const linkStyle = (route: string[]) =>
        `${
            isSelected(pathname, route)
                ? 'text-ternary bg-primary-dark'
                : 'text-secondary'
        } w-full justify-center inline-block text-center py-4 rounded hover:bg-primary-dark active:bg-primary-dark`;

    const iconStyle = (route: string[]) =>
        `${
            isSelected(pathname, route) ? 'text-ternary' : 'text-secondary'
        } tab tab-home block text-xs w-6 h-6 m-auto`;

    return (
        <Card className="pl-safe z-20 flex min-h-0 flex-1 flex-col rounded-none">
            <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
                <nav className="mt-16 flex-1 space-y-1 bg-transparent px-2">
                    <Link href="/" className={linkStyle(['/'])}>
                        <HomeIcon className={iconStyle(['/'])} />
                        Home
                    </Link>
                    <Link href="/weights" className={linkStyle(['/weights'])}>
                        <ScaleIcon className={iconStyle(['/weights'])} />
                        Weights
                    </Link>
                    <Link href="/heights" className={linkStyle(['/heights'])}>
                        <ArrowUpCircleIcon
                            className={iconStyle(['/heights'])}
                        />
                        Heights
                    </Link>
                    <Link href="/bodies" className={linkStyle(['/bodies'])}>
                        <ArrowsRightLeftIcon
                            className={iconStyle(['/bodies'])}
                        />
                        Bodies
                    </Link>
                    <Link href="/settings" className={linkStyle(['/settings'])}>
                        <Cog6ToothIcon className={iconStyle(['/settings'])} />
                        Settings
                    </Link>
                </nav>
            </div>
        </Card>
    );
};
