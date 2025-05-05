"use client";

import { twMerge } from "tailwind-merge";
import { useTheme } from "../../providers/theme";
import { useAside } from "../../providers/aside";

function Header() {
    const { theme, setTheme } = useTheme();
    const { open, setOpen } = useAside();

    return (
        <header
            className={twMerge(
                "w-full",
                "h-header",
                "flex",
                "items-center",
                "px-5",
                ["theme-border", "border-b"],
                "theme-paper",
            )}>
            <button
                onClick={() => {
                    console.log("theme change");
                    setTheme();
                }}>
                {theme}
            </button>
            <button
                onClick={() => {
                    console.log("aside change");
                    setOpen(!open);
                }}>
                {open ? "close" : "open"}
            </button>
        </header>
    );
}

export default Header;
