import { Viewport } from "next";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
};

async function RootLayout({ children }: PropsWithChildren) {
    return (
        <html>
            <body className={twMerge("text-sm", "lg:text-base")}>{children}</body>
        </html>
    );
}

export default RootLayout;
