"use server";

import { ReactNode } from "react";
import "../../styles/index.css";
import { Viewport } from "next";

type Props = {
    children: ReactNode;
    lang?: string;
};

async function HTML({ children, lang }: Props) {
    return (
        <html lang={lang || "ko"}>
            <body className={"theme-initial"}>{children}</body>
        </html>
    );
}

export default HTML;
