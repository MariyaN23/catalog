import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "@/lib/types/Product";
import {fetchProducts} from "@/features/products/ProductsActions";
import {Status} from "@/lib/types/Status";
import {Sort} from "@/lib/types/Sort";
import {Filter} from "@/lib/types/Filter";
import {ProductCharacteristics} from "@/lib/types/ProductCharacteristics";

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
    searchFilters: Filter
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
    searchFilters: {},
}

const applyFilters = (products: Product[], filters: Filter): Product[] => {
    if (Object.keys(filters).length === 0) {
        return [...products]
    }

    return products.filter(product => {
        return Object.entries(filters).every(([key, filterValues]) => {
            if (!filterValues || filterValues.length === 0) return true

            const productValue = product.characteristics[key as keyof ProductCharacteristics];
            if (productValue === undefined || productValue === null) {
                return false
            }

            return filterValues.includes(productValue.toString())
        })
    })
}

const applySorting = (products: Product[], sorting: Sort): Product[] => {
    const sortedProducts = [...products]

    switch (sorting) {
        case 'asc':
            return sortedProducts.sort((a, b) => a.price - b.price)
        case 'desc':
            return sortedProducts.sort((a, b) => b.price - a.price)
        default:
            return sortedProducts
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
            const filtered = applyFilters(state.items, state.searchFilters)
            state.filteredItems = applySorting(filtered, action.payload)
            state.pagination.currentPage = 1
        },
        setSelectedFilters: (state, action: PayloadAction<Filter>) => {
            state.searchFilters = action.payload
            const filtered = applyFilters(state.items, action.payload)
            state.filteredItems = applySorting(filtered, state.sorting)
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
                        const characteristicKey = key as keyof ProductCharacteristics
                        if (!filters[characteristicKey]) {
                            filters[characteristicKey] = []
                        }
                        if (value && !filters[characteristicKey].includes(value)) {
                            filters[characteristicKey].push(value)
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
                state.error = action.payload as string
            })
    }
})

export const {
    setCurrentPage,
    setSortingValue,
    setSelectedFilters,
} = slice.actions
