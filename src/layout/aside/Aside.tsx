import { twMerge } from "../../functions/twMerge";

interface Props {
    open: boolean;
    onClose: VoidFunction;
}

function Aside({ open, onClose }: Props) {
    return (
        <aside
            className={twMerge(
                ["w-aside", "h-dvh"],
                ["fixed", "top-0", "left-0"],
                ["theme-border", "border-r"],
                "z-20",
                ["overflow-hidden", "overscroll-y-auto"],
                ["transition-transform", "duration-200", "lg:translate-x-0"],
                "theme-paper",
                open ? "translate-x-0" : "-translate-x-full",
            )}>
            aside
        </aside>
    );
}

export default Aside;
