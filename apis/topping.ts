import { apiSlice } from "./index";

const basePath = "toppings";

export type ITopping = {
    id: number;
    nameTopping: string;
    price: number;
    enable: boolean;
    productIds: number[];
};

export const voucherApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        toppings: builder.query({
            query: ({ enable = false }: { enable?: boolean }) => ({
                url: `${basePath}?enable=${enable}`,
                method: "GET",
            }),
            transformResponse(
                baseQueryReturnValue: { message: string; data?: ITopping[] },
                meta,
                arg
            ) {
                return baseQueryReturnValue?.data;
            },
        }),
        createTopping: builder.mutation({
            query: (payload: {
                nameTopping: string;
                price: number;
                productIds: number[];
            }) => {
                return {
                    url: `${basePath}`,
                    method: "POST",
                    body: payload,
                };
            },
            transformErrorResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue.data;
            },
        }),
        updateTopping: builder.mutation({
            query: (payload: {
                nameTopping: string;
                price: number;
                productIds: number[];
                toppingId: number;
            }) => {
                return {
                    url: `${basePath}/${payload.toppingId}`,
                    method: "PUT",
                    body: payload,
                };
            },
            transformErrorResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue.data;
            },
        }),
        updateStatusTopping: builder.mutation({
            query: ({ status, id }: { id: number; status: string }) => ({
                url: `${basePath}/${id}/status/${status}`,
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
        deleteTopping: builder.mutation({
            query: ({ id }: { id: number }) => ({
                url: `${basePath}/${id}`,
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
    useToppingsQuery,
    useCreateToppingMutation,
    useLazyToppingsQuery,
    useUpdateToppingMutation,
    useUpdateStatusToppingMutation,
    useDeleteToppingMutation,
} = voucherApiSlice;
