"use client"
import { useDispatch, useSelector } from 'react-redux';
import { productsSelectors } from "@/features/products";
import { AppDispatch } from "@/lib/types/App";
import { fetchProducts } from "@/features/products/productsActions";
import { useEffect } from "react";
import { setCurrentPage, setSortingValue, setSelectedFilters } from "@/features/products/productsReducer";
import { Sort } from "@/lib/types/Sort";
import {Filter} from "@/lib/types/Filter";

export function useProducts() {
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector(productsSelectors.selectPaginatedProducts)
    const status = useSelector(productsSelectors.selectStatus)
    const sorting = useSelector(productsSelectors.selectSorting)
    const error = useSelector(productsSelectors.selectError)
    const currentPage = useSelector(productsSelectors.selectCurrentPage)
    const totalPages = useSelector(productsSelectors.selectTotalPages)
    const filters = useSelector(productsSelectors.selectFilters)
    const searchFilters = useSelector(productsSelectors.selectSearchFilters)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const onPageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage))
    }

    const onSortChange = (value: Sort) => {
        dispatch(setSortingValue(value))
    }

    const onFilterChange = (updatedFilters: Filter) => {
        dispatch(setSelectedFilters(updatedFilters))
    }

    const onClearFilters = () => {
        dispatch(setSelectedFilters({}))
    }

    return {
        products,
        status,
        sorting,
        error,
        currentPage,
        totalPages,
        filters,
        searchFilters,
        onPageChange,
        onSortChange,
        onFilterChange,
        onClearFilters,
    }
}