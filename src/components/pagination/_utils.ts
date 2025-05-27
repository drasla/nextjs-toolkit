export function getVisiblePages(page: number, total: number, maxVisible: number) {
    if (total <= maxVisible) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    const sideCount = Math.floor((maxVisible - 3) / 2);

    const showLeftEllipsis = page > sideCount + 2;
    const showRightEllipsis = page < total - sideCount - 1;

    pages.push(1);

    if (showLeftEllipsis) {
        pages.push("...");
    }

    const start = showLeftEllipsis ? Math.max(page - sideCount, 2) : 2;
    const end = showRightEllipsis ? Math.min(page + sideCount, total - 1) : total - 1;

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (showRightEllipsis) {
        pages.push("...");
    }

    pages.push(total);

    return pages;
}