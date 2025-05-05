import { PropsWithChildren } from "react";
import { AsideStateProvider } from "./client";

export function AsideProvider({ children }: PropsWithChildren) {
    return (
        <>
            {children}
            <AsideStateProvider />
        </>
    );
}