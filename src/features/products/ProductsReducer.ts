import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/lib/types/Product";
import { fetchProducts } from "@/features/products/ProductsActions";
import { Status } from "@/lib/types/Status";
import { Sort } from "@/lib/types/Sort";
import { mapProductCharacteristicsToNames } from "@/helpers/mappers";
import { Filter } from "@/lib/types/Filter";

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
    filters: Filter
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
    },
    filters: {},
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

                const filters: Filter = {}
                action.payload.products.forEach((product: Product) => {
                    Object.entries(product.characteristics).forEach(([key, value]) => {
                        const characteristicKey = key as keyof typeof mapProductCharacteristicsToNames
                        const russianKey = mapProductCharacteristicsToNames[characteristicKey]
                        if (!filters[russianKey]) {
                            filters[russianKey] = []
                        }
                        if (value && !filters[russianKey].includes(value)) {
                            filters[russianKey].push(value)
                        }
                    })
                })
                Object.keys(filters).forEach((key) => {
                    filters[key].sort()
                })
                state.filters = filters
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
