import { PropsWithChildren } from "react";
import { ThemeStateProvider } from "./client";

export function ThemeProvider({ children }: PropsWithChildren) {
    return (
        <>
            <meta name="color-scheme" content="light dark" />
            <meta name="theme-color" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" media="(prefers-color-scheme: dark)" />

            {children}
            <ThemeStateProvider />
        </>
    );
}
