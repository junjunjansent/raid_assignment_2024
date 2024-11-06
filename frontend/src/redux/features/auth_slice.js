import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // check if userInfo is in local storage
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
};

const auth_slice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));

            const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
            localStorage.setItem("expirationTime", expirationTime);
        },

        logout: (state) => {
            state.userInfo = null;
            localStorage.clear();
        },
    },
});

export const { setCredentials, logout } = auth_slice.actions;

export default auth_slice.reducer;