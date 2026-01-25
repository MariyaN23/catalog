import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Интернет-аптека",
    description: "Заказывайте лекарства, косметику, витамины и БАДы по доступным ценам с доставкой в аптеки Минска",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Providers>
            <div className={'mx-auto max-w-[1410px] py-16 min-h-screen'}>
                {children}
            </div>
        </Providers>
        </body>
        </html>
    );
}
