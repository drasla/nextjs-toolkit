"use server";

import { ReactNode } from "react";
import "../../styles/index.css";
import { twMerge } from "tailwind-merge";
import { ThemeProvider } from "../../providers/theme";
import { AsideProvider } from "../../providers/aside";

type Props = {
    children: ReactNode;
    lang?: string;
};

async function HTML({ children, lang }: Props) {
    return (
        <ThemeProvider>
            <AsideProvider>
                <html lang={lang || "ko"}>
                    <body className={twMerge("theme-initial")}>{children}</body>
                </html>
            </AsideProvider>
        </ThemeProvider>
    );
}

export default HTML;
