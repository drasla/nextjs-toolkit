import { twMerge } from "../../functions/twMerge";

function Header() {
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
            header
        </header>
    );
}

export default Header;
