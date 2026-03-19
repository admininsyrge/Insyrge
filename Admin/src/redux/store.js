import { configureStore } from "@reduxjs/toolkit";
import adminDetailReducer from "./slices/AdminDetails";

const store = configureStore({
    reducer: {
        user: adminDetailReducer,
    }
})

export default store