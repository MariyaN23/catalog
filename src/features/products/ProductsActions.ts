import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "@/lib/api/products-api";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (arg, {
    rejectWithValue
}) => {
    try {
        const response = await productsApi.getProducts()
        return {products: response.data}
    } catch (error: unknown) {
        if (error instanceof Error) {
            const axiosError = error as { response?: { data?: { message?: string } } }
            return rejectWithValue(
                axiosError.response?.data?.message ||
                error.message ||
                'Ошибка при загрузке продуктов'
            )
        }
        return rejectWithValue('Ошибка при загрузке продуктов')
    }
})
