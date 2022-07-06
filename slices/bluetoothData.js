import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nameBluetooth: null,
    connected:false,
    message:null,
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
        setMessageB:(state, action) => {
            state.message = action.payload;
        },
    }
});

export const { setNameBluetooth, setConnected, setMessageB } = bluetoothData.actions;

// Selectors

export const selectNameBluetooth = (state) => state.bluetooth.nameBluetooth
export const selectConnected = (state) => state.bluetooth.connected
export const selectMessage = (state) => state.bluetooth.message

export default bluetoothData.reducer