'use client';

import { FC } from 'react';
import { Disclosure } from '@headlessui/react';
import { Dumbbell } from '../Icons/Dumbbell';
import { UserButton } from '@clerk/nextjs';

export const Header: FC = () => {
    return (
        <Disclosure
            as="nav"
            className="pt-safe bg-primary-dark dark:bg-background fixed inset-x-0 top-0 z-10 block shadow"
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
        </Disclosure>
    );
};
