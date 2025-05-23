import { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { ThemeUIProvider } from "../../providers/theme";
import { AsideUIProvider } from "../../providers/aside";

interface Props extends PropsWithChildren {
    aside?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
}

function VerticalLayout({ aside, children, header, footer }: Props) {
    return (
        <div className={twMerge("w-full", "min-h-dvh", "flex")}>
            {aside && <AsideUIProvider>{aside}</AsideUIProvider>}
            <div
                className={twMerge(
                    ["flex-1", "w-full"],
                    ["flex", "flex-col", "relative"],
                    ["transition-all", "duration-200"],
                    aside ? "lg:ml-(--width-aside)" : "",
                )}>
                {header && (
                    <AsideUIProvider>
                        <ThemeUIProvider>{header}</ThemeUIProvider>
                    </AsideUIProvider>
                )}
                <main
                    className={twMerge(
                        ["w-full", "min-h-[calc(100dvh-var(--height-header))]"],
                        ["py-6"],
                    )}>
                    {children}
                </main>
                {footer}
            </div>
        </div>
    );
}

export default VerticalLayout;
