'use client'
import { useDispatch, useSelector } from 'react-redux';
import { productsSelectors } from "@/features/products";
import { AppDispatch } from "@/lib/types/App";
import { fetchProducts } from "@/features/products/ProductsActions";
import { useEffect } from "react";
import { setCurrentPage } from "@/features/products/ProductsReducer";

export function useProducts() {
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector(productsSelectors.selectPaginatedProducts())
    const currentPage = useSelector(productsSelectors.selectCurrentPage())
    const totalPages = useSelector(productsSelectors.selectTotalPages())

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const onPageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage))
    }

    return {
        products,
        currentPage,
        totalPages,
        onPageChange,
    }
}