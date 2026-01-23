import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/lib/types/Product";
import { fetchProducts } from "@/features/products/ProductsActions";

type InitialState = {
    items: Product[]
    filteredItems: Product[]
    paginatedItems: Product[]
    loading: boolean
    error: string | null
    pagination: {
        currentPage: number
        itemsPerPage: number
        totalPages: number
    }
}

const initialState: InitialState = {
    items: [],
    filteredItems: [],
    paginatedItems: [],
    loading: false,
    error: null,
    pagination: {
        currentPage: 1,
        itemsPerPage: 12,
        totalPages: 1,
    }
}

export const slice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload
            const startIndex = (state.pagination.currentPage - 1) * state.pagination.itemsPerPage
            const endIndex = startIndex + state.pagination.itemsPerPage
            state.paginatedItems = state.filteredItems.slice(startIndex, endIndex)
        },
/*        filterProducts: (state, action: PayloadAction<string>) => {
        },*/
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload.products
                state.filteredItems = action.payload.products
                state.pagination.totalPages = Math.ceil(state.filteredItems.length / state.pagination.itemsPerPage)
                state.pagination.currentPage = 1
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string || 'Ошибка загрузки товаров'
            })
    }
})

export const {
    setCurrentPage,
} = slice.actions
