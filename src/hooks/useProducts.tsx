'use client'
import { useEffect, useMemo, useState } from "react";
import { Product } from "@/lib/types/Product";
import { productsApi } from "@/lib/api/products-api";

export function useProducts(currentPage: number) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<null | string>(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const itemsPerPage = 12

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true)
                setError(null)
                const res = await productsApi.getProducts()
                setProducts(res.data)
                const total = Math.ceil(res.data.length / itemsPerPage)
                setTotalPages(total || 1)
            } catch (err) {
                const errorMessage = (err as Error).message
                setError(errorMessage)
            } finally {
                setLoading(false)
            }
        }

        getProducts()
    }, [])

    const paginatedProducts = useMemo(() => {
        const startIndex = (page - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return products.slice(startIndex, endIndex)
    }, [products, page])

    return {
        products: paginatedProducts,
        loading,
        error,
        page,
        totalPages,
        itemsPerPage,
    }
}