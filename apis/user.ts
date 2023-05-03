import { apiSlice } from "./index";
import { setCredentials, logOut } from "../auth/authSlice";
import { store } from "../app/store";

const basePathUser = "users";

export type IUser = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
    phoneNumber?: string;
    prefixPhone?: string;
};

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `${basePathUser}/sign-in`,
                method: "POST",
                body: { ...credentials },
            }),
            transformErrorResponse: (error: any) => {
                const { data } = error || {};
                return {
                    statusCode: data.statusCode || 400,
                    message: data.message || "Sorry! Something went wrong",
                };
            },
            transformResponse: (data: { data: IUser; message: string }) => {
                const { data: user } = data || {};
                if (user && user.accessToken) {
                    const accessToken = user.accessToken;
                    delete user.accessToken;
                    store.dispatch(setCredentials({ user, accessToken }));
                } else {
                    store.dispatch(logOut());
                }
                return data;
            },
        }),
        regis: builder.mutation({
            query: (credentials) => ({
                url: `${basePathUser}/sign-up`,
                method: "POST",
                body: { ...credentials },
            }),
            transformErrorResponse: (error: any) => {
                const { data } = error || {};
                return {
                    statusCode: data.statusCode || 400,
                    message: data.message || "Sorry! Something went wrong",
                };
            },
            transformResponse: (data: { data: IUser; message: string }) => {
                const { data: user } = data || {};
                if (user && user.accessToken) {
                    const accessToken = user.accessToken;
                    delete user.accessToken;
                    store.dispatch(setCredentials({ user, accessToken }));
                } else {
                    store.dispatch(logOut());
                }
                return data;
            },
        }),
    }),
});

export const { useLoginMutation, useRegisMutation } = authApiSlice;
