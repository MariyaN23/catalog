import { AppRootState } from "@/lib/types/App";
import { createSelector } from "reselect";

const selectFilteredItems = (state: AppRootState) => state.products.filteredItems
const selectItemsPerPage = (state: AppRootState) => state.products.pagination.itemsPerPage
export const selectStatus = (state: AppRootState) => state.products.status
export const selectSorting = (state: AppRootState) => state.products.sorting
export const selectError = (state: AppRootState) => state.products.error
export const selectCurrentPage = (state: AppRootState) => state.products.pagination.currentPage
export const selectFilters = (state: AppRootState) => state.products.filters
export const selectSearchFilters = (state: AppRootState) => state.products.searchFilters

export const selectPaginatedProducts = createSelector(
    [selectFilteredItems, selectCurrentPage, selectItemsPerPage],
    (filteredItems, currentPage, itemsPerPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return filteredItems.slice(startIndex, endIndex)
    }
)

export const selectTotalPages = createSelector(
    [selectFilteredItems, selectItemsPerPage],
    (filteredItems, itemsPerPage) => {
        return Math.ceil(filteredItems.length / itemsPerPage)
    }
)
