'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Chart as ChartJS } from 'chart.js';

ChartJS.defaults.color = '#AFD257';
ChartJS.defaults.borderColor = '#0D3140';
ChartJS.defaults.font.family = "'Oswald', 'sans-serif'";
ChartJS.defaults.font.size = 10;

export function Providers({ children }: { children: ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    );
}
