import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userData";
import bluetoothReducer from "../slices/bluetoothData"

export const store = configureStore({
    reducer:{
        user: userReducer,
        bluetooth: bluetoothReducer
    },
});