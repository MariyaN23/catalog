'use client'
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Pagination } from "@heroui/react";
import { useSearchParams, useRouter } from "next/navigation";
import { SortSelect } from "@/components/catalog/SortSelect";

export const Catalog = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const currentPage = parseInt(searchParams.get('page') || '1')

    const {
        products,
        loading,
        error,
        totalPages
    } = useProducts(currentPage)

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams)
        if (newPage === 1) {
            params.delete('page')
        } else {
            params.set('page', newPage.toString())
        }
        router.push(`/catalog?${params.toString()}`)
    }

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
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
                <div className={'flex justify-center py-8'}>
                    <Pagination
                        page={currentPage}
                        total={totalPages}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}
