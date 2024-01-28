'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isSelected } from '~/app/_components/Navigation/utils';
import {
    Cog6ToothIcon,
    HomeIcon,
    ListBulletIcon,
} from '@heroicons/react/24/outline';
import { Card } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

export const BottomNavigation: FC = () => {
    const pathname = usePathname();

    const color = (route: string[]) =>
        isSelected(pathname, route) ? 'primary' : 'secondary';

    return (
        <Card
            id="bottom-navigation"
            className="pb-safe fixed inset-x-0 bottom-0 z-10 block rounded-none"
        >
            <div id="tabs" className="flex justify-between">
                <Button
                    color={color(['/'])}
                    variant="light"
                    as={Link}
                    href="/"
                    className="h-16"
                >
                    <div className="my-4 flex flex-col items-center justify-center">
                        <HomeIcon className="h-6" />
                        <span>Home</span>
                    </div>
                </Button>
                <Button
                    color={color(['/all'])}
                    variant="light"
                    as={Link}
                    href="/all"
                    className="h-16"
                >
                    <div className="my-4 flex flex-col items-center justify-center">
                        <ListBulletIcon className="h-6" />
                        <span>All</span>
                    </div>
                </Button>
                <Button
                    color={color(['/settings'])}
                    variant="light"
                    as={Link}
                    href="/settings"
                    className="h-16"
                >
                    <div className="my-4 flex flex-col items-center justify-center">
                        <Cog6ToothIcon className="h-6" />
                        <span>Settings</span>
                    </div>
                </Button>
            </div>
        </Card>
    );
};
