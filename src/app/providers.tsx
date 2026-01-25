"use client"
import { HeroUIProvider } from '@heroui/react'
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { ReactNode } from "react";

export function Providers({children}: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <HeroUIProvider>
                {children}
            </HeroUIProvider>
        </Provider>
    )
}
