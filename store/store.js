import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../slices/userData";

export const store = configureStore({
    reducer:{
        nav: navReducer,
    },
});