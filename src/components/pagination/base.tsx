"use client";

import { twMerge } from "tailwind-merge";
import { PaginationProps } from "./_types";
import Decimal from "decimal.js";
import { getVisiblePages } from "./_utils";
import { TbChevronLeft, TbChevronRight, TbDots } from "react-icons/tb";
import { useResponsiveView } from "../../hooks/useResponsiveView";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Pagination({ page, size, total, className = "", variant = "rounded" }: PaginationProps) {
    const showCompact = useResponsiveView();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalPages = new Decimal(total).div(size).ceil().toNumber();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const baseItemClass = twMerge(
        ["w-9", "h-9", "mx-1"],
        ["flex", "justify-center", "items-center"],
        ["text-sm"],
        ["select-none", "cursor-pointer"],
        variant === "rounded" ? "rounded-full" : "rounded-md",
    );

    const activeClass = twMerge(["bg-primary-main", "text-primary-contrast"]);
    const ellipsisClass = twMerge(["bg-disable-main", "text-disable-contrast"]);
    const navBtnDisabledClass = twMerge("opacity-40", "cursor-not-allowed");

    const renderPage = (p: number | string, page: number, index: number) => {
        if (typeof p === "string") {
            return (
                <span
                    key={`ellipsis-${index}`}
                    className={twMerge(ellipsisClass, ["px-1"], ["flex", "items-center"])}>
                    <TbDots size={18} />
                </span>
            );
        }

        return (
            <span
                key={p.toString()}
                onClick={() => p !== page && handlePageChange(p)}
                className={twMerge(baseItemClass, p === page && activeClass)}>
                {p}
            </span>
        );
    };

    const renderNavButton = (type: "prev" | "next") => {
        const isPrev = type === "prev";
        const disabled = isPrev ? page <= 1 : page >= total;

        return (
            <button
                onClick={() => !disabled && handlePageChange(isPrev ? page - 1 : page + 1)}
                disabled={disabled}
                className={twMerge(
                    ["px-1"],
                    ["text-disable-main", "hover:text-primary-main"],
                    ["transition-colors", "duration-200"],
                    disabled && navBtnDisabledClass,
                )}
                aria-label={isPrev ? "이전 페이지" : "다음 페이지"}>
                {isPrev ? <TbChevronLeft size={18} /> : <TbChevronRight size={18} />}
            </button>
        );
    };

    const visiblePages = getVisiblePages(page, totalPages, showCompact ? 5 : 9);

    return (
        <nav
            className={twMerge("flex justify-center items-center gap-1 mt-4", className)}
            role="navigation">
            {renderNavButton("prev")}
            {visiblePages.map((p, index) => renderPage(p, page, index))}
            {renderNavButton("next")}
        </nav>
    );
}

export default Pagination;
