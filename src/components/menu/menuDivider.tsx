import { twMerge } from "tailwind-merge";

export function MenuDivider() {
    return <div className={twMerge("h-px", "my-1", "bg-light-divider", "dark:bg-dark-divider")} />;
}
