'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isSelected } from '~/app/_components/Navigation/utils';
import {
    Cog6ToothIcon,
    HomeIcon,
    RectangleStackIcon,
    ScaleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';

export const BottomNavigation: FC = () => {
    const pathname = usePathname();

    const color = (route: string[]) =>
        isSelected(pathname, route) ? 'primary' : 'secondary';

    return (
        <div
            id="bottom-navigation"
            className="pb-safe fixed inset-x-0 bottom-0 z-50 block rounded-none"
        >
            <div id="tabs" className="grid h-full grid-cols-4">
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
                    color={color(['/eat'])}
                    variant="light"
                    as={Link}
                    href="/eat"
                    className="h-16"
                >
                    <div className="my-4 flex flex-col items-center justify-center">
                        <RectangleStackIcon className="h-6" />
                        <span>Eat</span>
                    </div>
                </Button>
                <Button
                    color={color(['/body'])}
                    variant="light"
                    as={Link}
                    href="/body"
                    className="h-16"
                >
                    <div className="my-4 flex flex-col items-center justify-center">
                        <ScaleIcon className="h-6" />
                        <span>Body</span>
                    </div>
                </Button>
                <Button
                    color={color(['/settings'])}
                    variant="light"
                    as={Link}
                    href="/settings"
                    className="h-16"
                >
                    <div className="flex flex-col items-center justify-center">
                        <Cog6ToothIcon className="h-6" />
                        <span>Settings</span>
                    </div>
                </Button>
            </div>
        </div>
    );
};
