import { rootReducer } from "@/app/reducers";
import { store } from "@/app/store";

export type AppDispatch = typeof store.dispatch
export type RootReducer = typeof rootReducer
export type AppRootState = ReturnType<RootReducer>
