import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    nameBluetooth: null,
    address: null,
    connected:false,
};

export const bluetoothData = createSlice({
    name: 'bluetooth',
    initialState,
    reducers: {
        setId:(state, action) => {
            state.id = action.payload;
        },
        setNameBluetooth:(state, action) => {
            state.nameBluetooth = action.payload;
        },
        setAddress:(state, action) => {
            state.address = action.payload;
        },
        setConnected:(state, action) => {
            state.connected = action.payload;
        },
    }
});

export const { setId, setNameBluetooth, setAddress, setConnected } = bluetoothData.actions;

// Selectors

export const selectId = (state) => state.bluetooth.id
export const selectNameBluetooth = (state) => state.bluetooth.nameBluetooth
export const selectAddress = (state) => state.bluetooth.address
export const selectConnected = (state) => state.bluetooth.connected

export default bluetoothData.reducer