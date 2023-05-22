import { apiSlice } from "./index";
import {
    setCredentials,
    logOut,
    selectCurrentUser,
    selectCurrentToken,
    setCurrentUser,
} from "../auth/authSlice";
import { store } from "../app/store";

const basePathUser = "users";

export interface IRole {
    id: number;
    role: string;
    roleName: string;
}

export type IUser = {
    id?: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
    phoneNumber?: string;
    prefixPhone?: string;
    roleId?: number;
    status?: string;
    Role?: IRole;
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
        updateProfile: builder.mutation({
            query: ({ firstName, lastName, id, phoneNumber }: IUser) => ({
                url: `${basePathUser}/${id}`,
                method: "PATCH",
                body: { firstName, lastName, phoneNumber },
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
                if (user) {
                    store.dispatch(setCurrentUser({ user }));
                }
                return user;
            },
        }),
        users: builder.query({
            query: () => ({
                url: `${basePathUser}`,
                method: "GET",
            }),
            transformResponse: (data: { data: IUser[]; message: string }) => {
                return data.data;
            },
        }),
        roles: builder.query({
            query: () => ({
                url: `${basePathUser}/roles`,
                method: "GET",
            }),
            transformResponse: (data: { data: IRole[]; message: string }) => {
                return data.data;
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisMutation,
    useUpdateProfileMutation,
    useUsersQuery,
    useRolesQuery,
} = authApiSlice;
