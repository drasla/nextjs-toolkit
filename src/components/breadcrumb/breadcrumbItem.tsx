import { ReactNode } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export type BreadcrumbItemProps = {
    href?: string;
    label: string;
    icon?: ReactNode;
    isActive?: boolean;
    className?: string;
};

function BreadcrumbItem({ label, icon, isActive, className, href }: BreadcrumbItemProps) {
    const content = (
        <>
            {icon && <span className={"mx-1.5"}>{icon}</span>}
            <span>{label}</span>
        </>
    );

    if (href && !isActive) {
        return (
            <Link
                href={href}
                className={twMerge(
                    ["flex", "items-center"],
                    ["hover:text-primary-main", "transition-colors"],
                )}>
                {content}
            </Link>
        );
    }

    return (
        <span className={twMerge(isActive ? ["font-bold", "text-primary-dark"] : "", className)}>
            {content}
        </span>
    );
}

export default BreadcrumbItem;
