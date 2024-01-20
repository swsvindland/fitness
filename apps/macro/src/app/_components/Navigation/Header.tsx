'use client';

import { FC } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Card } from '@nextui-org/react';
import { Dumbbell } from '@fitness/ui';

export const Header: FC = () => {
    return (
        <Card
            as="nav"
            className="pt-safe fixed inset-x-0 top-0 z-50 block rounded-none"
        >
            <div className="mx-auto px-4 sm:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center">
                        <Dumbbell className="fill-secondary h-10 w-10" />
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
        </Card>
    );
};
