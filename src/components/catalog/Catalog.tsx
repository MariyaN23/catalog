'use client'
import { useProducts } from "@/hooks/useProducts";
import { Pagination } from "@heroui/react";
import { SortSelect } from "@/components/catalog/SortSelect";
import { ProductsSearch } from "@/components/catalog/ProductsSearch";

export const Catalog = () => {
    const {
        products,
        status,
        sorting,
        error,
        currentPage,
        totalPages,
        onPageChange,
        onSortChange,
    } = useProducts()

    return (
        <div className={'grid grid-cols-[270px_1fr] gap-4'}>
            <div className={'bg-white rounded-xl h-fit'}>
                filters
            </div>
            <div className={'space-y-4'}>
                <div className={'flex justify-end'}>
                    <SortSelect sorting={sorting} onSortChange={onSortChange} />
                </div>
                <ProductsSearch
                    products={products}
                    status={status}
                />
                <div className={'flex justify-center py-8'}>
                    <Pagination
                        page={currentPage}
                        total={totalPages}
                        onChange={(page: number) => onPageChange(page)}
                    />
                </div>
            </div>
        </div>
    )
}
