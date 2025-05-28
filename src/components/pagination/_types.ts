type PaginationVariant = "rounded" | "square";

export type PaginationProps = {
    page: number;
    size: number;
    total: number;
    className?: string;
    variant?: PaginationVariant;
}