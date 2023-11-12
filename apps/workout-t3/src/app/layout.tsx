import "~/styles/globals.css";

import { Oswald } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Layout } from "~/app/_components/Navigation/Layout";
import { MinVersion } from "~/app/_components/MinVersion";
import { Metadata } from "next";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "WorkoutTrack",
  description:
    "A workout tracking app is the perfect companion for the discerning fitness enthusiast.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  manifest: "/manifest.json",
  themeColor: "#0D3140",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${oswald.variable}`}>
          <TRPCReactProvider cookies={cookies().toString()}>
            <Layout>{children}</Layout>
            <MinVersion />
            <Analytics />
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
