import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../auth/authSlice";
import { apiSlice } from "../apis";
import { get } from "lodash";
import { encodeAes, decodeAes, isJson } from "../utils/helper";
import { variables } from "../utils/variable";

const currentAuth: any = decodeAes(
    localStorage.getItem("accessToken") || {},
    variables?.cryptoAesKey
);
const currentUser: any = decodeAes(
    localStorage.getItem("currentUser") || {},
    variables?.cryptoAesKey
);

const initialState = {
    auth: {
        user: isJson(currentUser) ? JSON.parse(currentUser) : {},
        token: currentAuth || null,
    },
};

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
    preloadedState: initialState,
});

store.subscribe(() => {
    const { auth } = store.getState();
    const user = get(auth, "user");
    const accessToken = get(auth, "token") || "";

    if (user && accessToken) {
        localStorage.setItem(
            "currentUser",
            encodeAes(JSON.stringify(user), variables.cryptoAesKey)
        );
        localStorage.setItem(
            "accessToken",
            encodeAes(accessToken, variables.cryptoAesKey)
        );
    }
});
