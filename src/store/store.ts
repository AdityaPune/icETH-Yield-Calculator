import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./Slices/balance-slice";

const store = configureStore({
    reducer: { balance: balanceReducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
