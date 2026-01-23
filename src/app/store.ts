import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/app/reducers";

export const store = configureStore({
    reducer: rootReducer
})
