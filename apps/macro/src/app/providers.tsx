'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Chart as ChartJS } from 'chart.js';

ChartJS.defaults.color = '#AFD257';
ChartJS.defaults.borderColor = '#0D3140';
ChartJS.defaults.font.family = "'Oswald', 'sans-serif'";
ChartJS.defaults.font.size = 14;

export function Providers({ children }: { children: ReactNode }) {
    const router = useRouter();
    const today = new Date().toDateString();

    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    );
}
