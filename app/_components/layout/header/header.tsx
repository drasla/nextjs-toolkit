"use client";

import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../../src";

function Header() {
    return (
        <header
            className={twMerge(
                ["w-full", "h-header", "sticky"],
                ["flex", "justify-between", "items-center"],
                "px-5",
                ["theme-border", "border-b"],
                "theme-paper",
            )}>
            <Link
                href={"/"}
                className={twMerge("h-20", ["flex", "items-center", "font-bold", "select-none"])}>
                <Image
                    className={twMerge("mr-2")}
                    alt={"Logo"}
                    src={"/assets/logo/logo_1.png"}
                    width={20}
                    height={20}
                />
                LogoText
            </Link>
            <div>
                <Button
                    color={"primary"}
                    variant={"outlined"}
                    size={"medium"}
                    onClick={() => {
                        console.log("click");
                    }}>
                    로그인
                </Button>
            </div>
        </header>
    );
}

export default Header;
