'use client'
import { useDispatch, useSelector } from 'react-redux';
import { productsSelectors } from "@/features/products";
import { AppDispatch } from "@/lib/types/App";
import { fetchProducts } from "@/features/products/ProductsActions";
import { useEffect } from "react";
import { setCurrentPage, setSortingValue } from "@/features/products/ProductsReducer";
import { Sort } from "@/lib/types/Sort";

export function useProducts() {
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector(productsSelectors.selectPaginatedProducts)
    const status = useSelector(productsSelectors.selectStatus)
    const sorting = useSelector(productsSelectors.selectSorting)
    const error = useSelector(productsSelectors.selectError)
    const currentPage = useSelector(productsSelectors.selectCurrentPage)
    const totalPages = useSelector(productsSelectors.selectTotalPages)
    const filters = useSelector(productsSelectors.selectFilters)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const onPageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage))
    }

    const onSortChange = (value: Sort) => {
        dispatch(setSortingValue(value))
    }

    return {
        products,
        status,
        sorting,
        error,
        currentPage,
        totalPages,
        filters,
        onPageChange,
        onSortChange,
    }
}