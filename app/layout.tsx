import { Viewport } from "next";
import { PropsWithChildren } from "react";
import fnEnv from "../src/functions/env";
import HTML from "../src/layout/html/base";
import VerticalLayout from "../src/layout/vertical/verticalLayout";
import { ThemeProvider } from "../src";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
};

async function RootLayout({ children }: PropsWithChildren) {
    const { string: fnString } = await fnEnv.server();

    return (
        <ThemeProvider>
            <HTML lang={await fnString("HTML_LANG", "ko")}>
                <VerticalLayout>{children}</VerticalLayout>
            </HTML>
        </ThemeProvider>
    );
}

export default RootLayout;
