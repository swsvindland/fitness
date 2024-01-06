'use client';

import { FC, ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

interface NextUIProps {
    children: ReactNode;
}

export const NextUI: FC<NextUIProps> = ({ children }) => {
    return <NextUIProvider>{children}</NextUIProvider>;
};
