import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nameBluetooth: null,
    connected:false,
};

export const bluetoothData = createSlice({
    name: 'bluetooth',
    initialState,
    reducers: {
        setNameBluetooth:(state, action) => {
            state.nameBluetooth = action.payload;
        },
        setConnected:(state, action) => {
            state.connected = action.payload;
        },
    }
});

export const { setNameBluetooth, setConnected } = bluetoothData.actions;

// Selectors

export const selectNameBluetooth = (state) => state.bluetooth.nameBluetooth
export const selectConnected = (state) => state.bluetooth.connected

export default bluetoothData.reducer