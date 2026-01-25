"use client"
import {Pagination} from "@heroui/react";
import {useProducts} from "@/hooks/useProducts";

export const SearchPagination = () => {
    const {
        currentPage,
        totalPages,
        onPageChange,
    } = useProducts()

    const handleSearchChange = (page: number) => {
        onPageChange(page)
    }

    if (!totalPages) return null

    return (
        <div className={'flex justify-center py-8'}>
            <Pagination
                page={currentPage}
                total={totalPages}
                onChange={handleSearchChange}
            />
        </div>
    )
}