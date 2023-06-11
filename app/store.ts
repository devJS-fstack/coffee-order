import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../auth/authSlice";
import { apiSlice } from "../apis";
import { get } from "lodash";
import { encodeAes, decodeAes, isJson } from "../utils/helper";
import { variables } from "../utils/variable";

const currentAuth: any =
    typeof window !== "undefined"
        ? decodeAes(
              localStorage.getItem("accessToken") || {},
              variables.cryptoAesKey
          )
        : null;
const currentUser: any =
    typeof window !== "undefined"
        ? decodeAes(
              localStorage.getItem("currentUser") || {},
              variables.cryptoAesKey
          )
        : null;

const currentRefreshToken: any =
    typeof window !== "undefined"
        ? decodeAes(
              localStorage.getItem("refreshToken") || {},
              variables.cryptoAesKey
          )
        : null;

const initialState = {
    auth: {
        user: isJson(currentUser) ? JSON.parse(currentUser) : {},
        token: currentAuth || null,
        refreshToken: currentRefreshToken,
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
