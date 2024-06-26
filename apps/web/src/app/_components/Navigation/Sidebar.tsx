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

export const Sidebar: FC = () => {
    const pathname = usePathname();

    const color = (route: string[]) =>
        isSelected(pathname, route) ? 'primary' : 'secondary';

    return (
        <div className="pl-safe flex min-h-0 flex-1 flex-col rounded-none">
            <div className="flex flex-1 flex-col overflow-y-auto">
                <nav className="flex flex-col justify-center space-y-1">
                    <Button
                        color={color(['/'])}
                        variant="light"
                        as={Link}
                        href="/"
                        className="h-20"
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
                        className="h-20"
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
                        className="h-20"
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
                        className="h-20"
                    >
                        <div className="my-4 flex flex-col items-center justify-center">
                            <Cog6ToothIcon className="h-6" />
                            <span>Settings</span>
                        </div>
                    </Button>
                </nav>
            </div>
        </div>
    );
};
