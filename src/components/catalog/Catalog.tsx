'use client'
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Pagination } from "@heroui/react";
import { SortSelect } from "@/components/catalog/SortSelect";

export const Catalog = () => {
    const {
        products,
        currentPage,
        totalPages,
        onPageChange,
    } = useProducts()

    return (
        <div className={'grid grid-cols-[270px_1fr] gap-4'}>
            <div className={'bg-white rounded-xl h-fit'}>
                filters
            </div>
            <div className={'space-y-4'}>
                <div className={'flex justify-end'}>
                    <SortSelect />
                </div>
                <div className={'grid grid-cols-4 gap-4'}>
                    {products.length > 0 ? products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    )) : (
                        <p className={'col-span-4 text-center'}>
                            Ничего не найдено
                        </p>
                    )}
                </div>
                <div className={'flex justify-center py-8'}>
                    <Pagination
                        page={currentPage}
                        total={totalPages}
                        onChange={(page: number)=> onPageChange(page)}
                    />
                </div>
            </div>
        </div>
    )
}
