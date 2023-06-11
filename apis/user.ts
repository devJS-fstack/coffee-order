import { apiSlice } from "./index";
import { setCredentials, logOut, setCurrentUser } from "../auth/authSlice";
import { store } from "../app/store";
import { STATUS_USERS } from "../utils/variable";

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
    refreshToken?: string;
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
                    const refreshToken = user.refreshToken as string | null;
                    delete user.accessToken;
                    delete user.refreshToken;

                    store.dispatch(
                        setCredentials({ user, accessToken, refreshToken })
                    );
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
                    const refreshToken = user.refreshToken as string | null;
                    delete user.accessToken;
                    delete user.refreshToken;

                    store.dispatch(
                        setCredentials({ user, accessToken, refreshToken })
                    );
                } else {
                    store.dispatch(logOut());
                }
                return data;
            },
        }),
        updateProfile: builder.mutation({
            query: ({
                firstName,
                lastName,
                id,
                phoneNumber,
                roleId,
            }: IUser) => ({
                url: `${basePathUser}/${id}`,
                method: "PATCH",
                body: { firstName, lastName, phoneNumber, roleId },
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
                const { auth } = store.getState();
                const { user: currentUser } = auth;
                const isCurrent = user.id && user.id === currentUser?.id;
                if (isCurrent) {
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
        createUser: builder.mutation({
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
        }),
        updateStatus: builder.mutation({
            query: ({
                status,
                userId,
            }: {
                userId: number;
                status: string;
            }) => ({
                url: `${basePathUser}/${userId}/status/${status}`,
                method: "PATCH",
            }),
            transformErrorResponse: (error: any) => {
                const { data } = error || {};
                return {
                    statusCode: data.statusCode || 400,
                    message: data.message || "Sorry! Something went wrong",
                };
            },
        }),
        deleteUser: builder.mutation({
            query: ({ userId }: { userId: number }) => ({
                url: `${basePathUser}/${userId}`,
                method: "DELETE",
            }),
            transformErrorResponse: (error: any) => {
                const { data } = error || {};
                return {
                    statusCode: data.statusCode || 400,
                    message: data.message || "Sorry! Something went wrong",
                };
            },
        }),
    }),
});

export const {
    useCreateUserMutation,
    useLoginMutation,
    useRegisMutation,
    useUpdateProfileMutation,
    useUsersQuery,
    useRolesQuery,
    useUpdateStatusMutation,
    useDeleteUserMutation,
} = authApiSlice;
