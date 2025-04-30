import { Viewport } from "next";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import fnEnv from "../src/functions/env";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
};

async function RootLayout({ children }: PropsWithChildren) {
    const { string: fnString } = await fnEnv.server();

    return (
        <html lang={await fnString("HTML_LANG", "en")}>
            <body className={twMerge("text-sm", "lg:text-base")}>{children}</body>
        </html>
    );
}

export default RootLayout;
