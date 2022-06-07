import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    phone: null,
    mail: null,
    password:null,
    stripeId:null,
    client:{id:-1,name:"Seleccione Cliente"},
};

export const userData = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName:(state, action) => {
            state.name = action.payload;
        },
        setPhone:(state, action) => {
            state.phone = action.payload;
        },
        setMail:(state, action) => {
            state.mail = action.payload;
        },
        setPassword:(state, action) => {
            state.password = action.payload;
        },
        setStripeId:(state, action) => {
            state.stripeId = action.payload;
        },
        setClient:(state, action) => {
            state.client = action.payload;
        },
    }
});

export const { setName, setPhone, setMail, setPassword, setStripeId, setClient } = userData.actions;

// Selectors

export const selectName = (state) => state.user.name
export const selectPhone = (state) => state.user.phone
export const selectMail = (state) => state.user.mail
export const selectPassword = (state) => state.user.password
export const selectStripeId = (state) => state.user.stripeId
export const selectClient = (state) => state.user.client

export default userData.reducer