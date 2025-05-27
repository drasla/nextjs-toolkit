type PaginationVariant = "rounded" | "square";

export type PaginationProps = {
    page: number;
    size: number;
    total: number;
    onPageChange: (page: number) => void;
    className?: string;
    variant?: PaginationVariant;
}