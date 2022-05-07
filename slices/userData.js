import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    phone: null,
    mail: null,
    password:null,
};

export const userData = createSlice({
    name: 'nav',
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
        }
    }
});

export const { setName, setPhone, setMail, setPassword } = userData.actions;

// Selectors

export const selectName = (state) => state.nav.name
export const selectPhone = (state) => state.nav.phone
export const selectMail = (state) => state.nav.mail
export const selectPassword = (state) => state.nav.password

export default userData.reducer