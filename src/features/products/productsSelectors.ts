import { AppRootState } from "@/lib/types/App";

export const selectPaginatedProducts = () => (state: AppRootState) => state.products.paginatedItems
export const selectCurrentPage = () => (state: AppRootState) => state.products.pagination.currentPage
export const selectTotalPages = () => (state: AppRootState) => state.products.pagination.totalPages
