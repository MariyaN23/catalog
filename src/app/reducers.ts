import { combineReducers } from "redux";
import { productsReducer } from "@/features/products";

export const rootReducer = combineReducers({
    products: productsReducer,
})
