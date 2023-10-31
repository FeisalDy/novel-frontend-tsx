export type TPagination = {
    totalCount: number
    pageSize: number
    siblingCount: number
    currentPage: number
}

export type TCPagination = {
    onPageChange: (page: number | string, short: string) => void
    totalCount: number
    siblingCount: number
    currentPage: number
    pageSize: number
    className: string
}
