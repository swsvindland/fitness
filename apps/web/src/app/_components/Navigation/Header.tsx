'use client';

import { FC } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Food } from '@fitness/ui';

export const Header: FC = () => {
    return (
        <nav className="pt-safe block rounded-none">
            <div className="mx-auto px-4 sm:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center">
                        <Food className="fill-secondary h-10 w-10" />
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
        </nav>
    );
};
