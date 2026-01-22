'use client'
import { useEffect, useState } from "react";
import { Product } from "@/lib/types/Product";
import { productsApi } from "@/lib/api/products-api";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<null | string>(null)

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true)
                setError(null)
                const res = await productsApi.getProducts()
                setProducts(res.data)
            } catch (err) {
                const errorMessage = (err as Error).message
                setError(errorMessage)
            } finally {
                setLoading(false)
            }
        }

        getProducts()
    }, [])

    return {
        products,
        loading,
        error
    }
}