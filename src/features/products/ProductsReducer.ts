import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/lib/types/Product";
import { fetchProducts } from "@/features/products/ProductsActions";
import { Status } from "@/lib/types/Status";
import { Sort } from "@/lib/types/Sort";

type InitialState = {
    items: Product[]
    filteredItems: Product[]
    status: Status
    sorting: Sort
    error: string | null
    pagination: {
        currentPage: number
        itemsPerPage: number
    }
}

const initialState: InitialState = {
    items: [],
    filteredItems: [],
    status: 'idle',
    sorting: 'default',
    error: null,
    pagination: {
        currentPage: 1,
        itemsPerPage: 12,
    }
}

export const slice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload
        },
        setSortingValue: (state, action: PayloadAction<Sort>) => {
            state.sorting = action.payload

            switch (action.payload) {
                case 'asc':
                    state.filteredItems.sort((a, b) => a.price - b.price)
                    break
                case 'desc':
                    state.filteredItems.sort((a, b) => b.price - a.price)
                    break
                default:
                    state.filteredItems = [...state.items]
            }
            state.pagination.currentPage = 1
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload.products
                state.filteredItems = action.payload.products
                state.pagination.currentPage = 1
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string || 'Ошибка загрузки товаров'
            })
    }
})

export const {
    setCurrentPage,
    setSortingValue,
} = slice.actions
