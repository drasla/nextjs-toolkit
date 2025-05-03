"use client";

import { PropsWithChildren, useState } from "react";
import { twMerge } from "../../functions/twMerge";
import Aside from "../aside/Aside";
import Header from "../header/base";

interface Props extends PropsWithChildren {
    aside?: boolean;
}

function VerticalLayout({ aside, children }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className={twMerge("w-full", "min-h-dvh", "flex")}>
            {aside && <Aside open={open} onClose={() => setOpen(false)} />}
            <div
                className={twMerge(
                    ["flex-1", "w-full"],
                    ["flex", "flex-col", "relative"],
                    ["transition-all", "duration-200"],
                    aside ? "lg:ml-(--width-aside)" : "",
                )}>
                <Header />
                <main>{children}</main>
            </div>
        </div>
    );
}

export default VerticalLayout;
