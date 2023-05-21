import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../apis/user";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null as IUser | null, token: null as string | null },
    reducers: {
        setCredentials: (
            state,
            action: {
                payload: { user: IUser | null; accessToken: string | null };
            }
        ) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("currentUser");
                localStorage.removeItem("accessToken");
            }
        },
        setCurrentUser: (
            state,
            action: {
                payload: { user: IUser | null };
            }
        ) => {
            const { user } = action.payload;
            state.user = user;
        },
    },
});

export const { setCredentials, logOut, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any): IUser | null => state.auth.user;
export const selectCurrentToken = (state: any): IUser | null =>
    state.auth.token;
