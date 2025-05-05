import { Viewport } from "next";
import { PropsWithChildren } from "react";
import { VerticalLayout } from "../src";
import fnEnv from "../src/functions/env";
import HTML from "../src/layout/html";
import Aside from "../src/layout/aside";
import Header from "./_components/layout/header/header";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
};

async function RootLayout({ children }: PropsWithChildren) {
    const { string: fnString } = await fnEnv.server();

    return (
        <HTML lang={await fnString("HTML_LANG", "ko")}>
            <VerticalLayout aside={<Aside />} header={<Header />}>
                {children}
            </VerticalLayout>
        </HTML>
    );
}

export default RootLayout;
