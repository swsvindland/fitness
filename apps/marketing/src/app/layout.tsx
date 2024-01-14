import '~/styles/globals.css';

import { Oswald } from 'next/font/google';
import { cookies } from 'next/headers';

import { TRPCReactProvider } from '~/trpc/react';
import { ClerkProvider } from '@clerk/nextjs';
import { type ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Metadata, Viewport } from 'next';
import { Providers } from '~/app/providers';

const oswald = Oswald({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: 'SV7',
    description: 'Your homepage to the internet',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
    manifest: '/manifest.json',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
    themeColor: '#0D3140',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" className="dark">
                <body className={`font-sans ${oswald.variable}`}>
                    <Providers>
                        <TRPCReactProvider cookies={cookies().toString()}>
                            <>{children}</>
                            <Analytics />
                        </TRPCReactProvider>
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
