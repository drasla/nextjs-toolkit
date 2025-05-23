import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import BreadcrumbItem, { BreadcrumbItemProps } from "./breadcrumbItem";
import { TbArrowBadgeRightFilled } from "react-icons/tb";

type BreadcrumbProps = {
    items: BreadcrumbItemProps[];
    separator?: ReactNode;
    className?: string;
};

function Breadcrumb({
    items,
    separator = <TbArrowBadgeRightFilled size={16} />,
    className,
}: BreadcrumbProps) {
    return (
        <div aria-label={"breadcrumb"}>
            <ol className={twMerge(["flex", "items-center", "text-sm", className])}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={twMerge(
                            ["flex", "items-center"],
                            index === items.length - 1
                                ? ["font-medium", "text-primary-dark"]
                                : "text-primary-dark",
                        )}>
                        <BreadcrumbItem {...item} />
                        {index < items.length - 1 && (
                            <span className={twMerge(["mx-2", "text-primary-light"])}>
                                {separator}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Breadcrumb;
