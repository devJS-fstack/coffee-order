import { apiSlice } from "./index";

const basePath = "toppings";

export type ITopping = {
    id: number;
    nameTopping: string;
    price: number;
    enable: boolean;
};

export const voucherApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        toppings: builder.query({
            query: () => ({
                url: `${basePath}`,
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
    }),
});

export const { useToppingsQuery } = voucherApiSlice;
