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
import { Button } from '@nextui-org/button';

export const Sidebar: FC = () => {
    const pathname = usePathname();

    const color = (route: string[]) =>
        isSelected(pathname, route) ? 'primary' : 'secondary';

    return (
        <Card className="pl-safe z-20 flex min-h-0 flex-1 flex-col rounded-none">
            <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
                <nav className="mt-16 flex flex-col justify-center space-y-1">
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
                        color={color(['/weights'])}
                        variant="light"
                        as={Link}
                        href="/weights"
                        className="h-16"
                    >
                        <div className="my-4 flex flex-col items-center justify-center">
                            <ScaleIcon className="h-6" />
                            <span>Weights</span>
                        </div>
                    </Button>
                    <Button
                        color={color(['/heights'])}
                        variant="light"
                        as={Link}
                        href="/heights"
                        className="h-16"
                    >
                        <div className="my-4 flex flex-col items-center justify-center">
                            <ArrowUpCircleIcon className="h-6" />
                            <span>Height</span>
                        </div>
                    </Button>
                    <Button
                        color={color(['/bodies'])}
                        variant="light"
                        as={Link}
                        href="/bodies"
                        className="h-16"
                    >
                        <div className="my-4 flex flex-col items-center justify-center">
                            <ArrowsRightLeftIcon className="h-6" />
                            <span>Bodies</span>
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
                </nav>
            </div>
        </Card>
    );
};
